const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const gameState = require('../utils/gameState');
const socketModule = require('../utils/socket');

// Load dummy questions
const questionsPath = path.join(__dirname, '..', 'data', 'questions.json');
let questions = [];
if (fs.existsSync(questionsPath)) {
  questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
} else {
  // Create data dir if not exists
  if (!fs.existsSync(path.join(__dirname, '..', 'data'))) {
    fs.mkdirSync(path.join(__dirname, '..', 'data'));
  }
  questions = [
    { id: 1, question: "What is 2+2?", options: ["3", "4", "5", "6"], answer: 1 },
    { id: 2, question: "What is the capital of France?", options: ["Berlin", "London", "Paris", "Madrid"], answer: 2 },
    { id: 3, question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: 1 }
  ];
  fs.writeFileSync(questionsPath, JSON.stringify(questions, null, 2));
}

// Local fallback if MongoDB is blocked
const leaderboardPath = path.join(__dirname, '..', 'data', 'leaderboard.json');
let localLeaderboard = [];
if (fs.existsSync(leaderboardPath)) {
  localLeaderboard = JSON.parse(fs.readFileSync(leaderboardPath, 'utf8'));
}

const saveLocalUser = (userObj) => {
  localLeaderboard.push(userObj);
  localLeaderboard.sort((a, b) => b.score - a.score || a.timeTaken - b.timeTaken);
  fs.writeFileSync(leaderboardPath, JSON.stringify(localLeaderboard, null, 2));
};

// Helper to broadcast leaderboard
const broadcastLeaderboard = async () => {
  try {
    const topUsers = await User.find().sort({ score: -1, timeTaken: 1 }).limit(10);
    socketModule.getIO().emit('leaderboard_update', topUsers);
  } catch (err) {
    console.log("MongoDB unavailable, broadcasting local fallback leaderboard");
    socketModule.getIO().emit('leaderboard_update', localLeaderboard.slice(0, 10));
  }
};

// Helper to end game
const endGame = async (sessionToken, res, completed = false) => {
  const session = gameState.getSession(sessionToken);
  
  if (session) {
    const userObj = {
      ...session.userDetails,
      score: session.score,
      timeTaken: session.totalTime
    };

    try {
      // Save to MongoDB
      const newUser = new User(userObj);
      await newUser.save();
    } catch (dbErr) {
      console.error("MongoDB save failed, saving to local JSON fallback");
      saveLocalUser(userObj);
    }
    
    // Remove session
    gameState.removeSession(sessionToken);
    
    // Broadcast leaderboard update
    broadcastLeaderboard();
    
    return res.json({ 
      correct: false, 
      gameOver: true, 
      score: session.score, 
      completed 
    });
  }
  
  return res.status(400).json({ error: 'Session not found' });
};

// Start Quiz
const startQuiz = (req, res) => {
  const { token, name, email, rollNo, instaHandle } = req.body;

  if (!token || !gameState.isValidQRToken(token)) {
    return res.status(400).json({ error: 'Invalid or expired QR token. Please scan the newest QR code on the screen.' });
  }

  // Consume the token so no one else can use this exact scan instance
  gameState.consumeQRToken(token);

  // Create session
  const sessionToken = uuidv4();
  const shuffledQuestions = [...questions].sort(() => 0.5 - Math.random());
  
  gameState.createSession(sessionToken, {
    userDetails: { name, email, rollNo, instaHandle },
    questions: shuffledQuestions,
    currentIndex: 0,
    score: 0,
    totalTime: 0,
    questionStartTime: Date.now(),
    lifelines: 3
  });

  const firstQuestion = { ...shuffledQuestions[0] };
  delete firstQuestion.answer;

  res.json({ success: true, sessionToken, question: firstQuestion, lifelines: 3 });
};

// Submit Answer
const submitAnswer = async (req, res) => {
  const { sessionToken, answerIndex, timeTaken } = req.body;
  const session = gameState.getSession(sessionToken);

  if (!session) return res.status(400).json({ error: 'Invalid session' });

  const currentQ = session.questions[session.currentIndex];
  
  if (answerIndex === currentQ.answer) {
    // Correct
    session.score += 1;
    session.totalTime += timeTaken;
    session.currentIndex += 1;

    if (session.currentIndex < session.questions.length) {
      const nextQ = { ...session.questions[session.currentIndex] };
      delete nextQ.answer;
      session.questionStartTime = Date.now();
      return res.json({ correct: true, nextQuestion: nextQ, score: session.score, lifelines: session.lifelines });
    } else {
      return await endGame(sessionToken, res, true);
    }
  } else {
    // Wrong
    session.totalTime += timeTaken;
    session.lifelines = (session.lifelines !== undefined ? session.lifelines : 3) - 1;


    if (session.lifelines > 0) {
      session.currentIndex += 1;
      if (session.currentIndex < session.questions.length) {
        const nextQ = { ...session.questions[session.currentIndex] };
        delete nextQ.answer;
        session.questionStartTime = Date.now();
        return res.json({ correct: false, gameOver: false, nextQuestion: nextQ, score: session.score, lifelines: session.lifelines });
      } else {
        return await endGame(sessionToken, res, true);
      }
    } else {
      return await endGame(sessionToken, res, false);
    }
  }
};

// Eliminate
const eliminate = async (req, res) => {
  const { sessionToken } = req.body;
  if (!gameState.hasSession(sessionToken)) {
    return res.json({ success: true });
  }
  await endGame(sessionToken, res, false);
};

// Get Leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const topUsers = await User.find().sort({ score: -1, timeTaken: 1 }).limit(10);
    res.json(topUsers);
  } catch (err) {
    console.log("MongoDB unavailable, sending local fallback leaderboard");
    res.json(localLeaderboard.slice(0, 10));
  }
};

module.exports = {
  startQuiz,
  submitAnswer,
  eliminate,
  getLeaderboard
};
