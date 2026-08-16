import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

const TIME_LIMIT = 15; // 15 seconds per question

const ActiveQuiz = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [sessionToken, setSessionToken] = useState('');
  
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const timerRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    // Initial Load
    const token = sessionStorage.getItem('quizSession');
    const qStr = sessionStorage.getItem('currentQuestion');
    
    if (!token || !qStr) {
      navigate('/orientation/join');
      return;
    }
    
    setSessionToken(token);
    setQuestion(JSON.parse(qStr));
    startTimeRef.current = Date.now();
    startTimer();

    // Tab Switch Elimination Listener
    const handleVisibilityChange = async () => {
      if (document.hidden && !gameOver) {
        // User switched tabs! Eliminate them.
        clearInterval(timerRef.current);
        await handleElimination(token);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Resize listener for confetti
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(timerRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const startTimer = () => {
    clearInterval(timerRef.current);
    setTimeLeft(TIME_LIMIT);
    startTimeRef.current = Date.now();
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleTimeUp = async () => {
    if (gameOver) return;
    // Auto-submit wrong answer if time is up
    submitAnswer(-1); 
  };

  const handleElimination = async (token) => {
    setGameOver(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await fetch(`${apiUrl}/api/quiz/eliminate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionToken: token })
      });
    } catch (e) {
      console.error(e);
    }
  };

  const submitAnswer = async (answerIndex) => {
    if (loading || gameOver) return;
    setLoading(true);
    clearInterval(timerRef.current);
    
    const timeTaken = Date.now() - startTimeRef.current;

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/quiz/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          sessionToken, 
          answerIndex, 
          timeTaken 
        })
      });
      const data = await res.json();
      
      setScore(data.score);

      if (data.gameOver) {
        setGameOver(true);
        setCompleted(data.completed);
      } else if (data.correct) {
        // Flash green briefly and go to next
        setQuestion(data.nextQuestion);
        sessionStorage.setItem('currentQuestion', JSON.stringify(data.nextQuestion));
        startTimer();
      }
    } catch (err) {
      console.error(err);
      // Fallback eliminate on error
      setGameOver(true);
    }
    setLoading(false);
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center p-6 text-center">
        {completed && <Confetti width={windowSize.width} height={windowSize.height} />}
        
        <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-700 max-w-lg w-full">
          {completed ? (
            <>
              <h1 className="text-4xl md:text-5xl font-black text-yellow-400 mb-4">You Won! 🏆</h1>
              <p className="text-xl text-gray-300 mb-6">You answered every single question correctly.</p>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-black text-red-500 mb-4 animate-bounce">Game Over! 💀</h1>
              <p className="text-xl text-gray-300 mb-6">One wrong move (or tab switch) and you're out!</p>
            </>
          )}
          
          <div className="text-6xl font-black text-white mb-2">{score}</div>
          <div className="text-gray-400 font-bold mb-8 tracking-widest uppercase">Final Score</div>
          
          <p className="text-blue-400 font-medium">Check the main screen to see if you made the Leaderboard!</p>
        </div>
      </div>
    );
  }

  if (!question) return <div className="min-h-screen bg-blue-900 flex items-center justify-center text-white">Loading...</div>;

  // Calculate timer color based on time left
  const timerColor = timeLeft > 7 ? 'text-green-400' : timeLeft > 3 ? 'text-yellow-400' : 'text-red-500 animate-pulse';

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 flex flex-col items-center p-4 lg:p-8 font-sans">
      
      {/* Top Bar: Score & Timer */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-8 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
        <div className="flex flex-col items-start">
          <span className="text-blue-200 text-sm font-bold uppercase tracking-wider">Score</span>
          <span className="text-3xl font-black text-white">{score}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-blue-200 text-sm font-bold uppercase tracking-wider">Time</span>
          <span className={`text-3xl font-black ${timerColor}`}>{timeLeft}s</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 lg:p-10 transform transition-all">
        <h2 className="text-2xl lg:text-3xl font-bold text-blue-900 mb-8 leading-tight">
          {question.question}
        </h2>
        
        <div className="space-y-4">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              disabled={loading}
              onClick={() => submitAnswer(idx)}
              className={`w-full text-left p-4 lg:p-5 rounded-2xl border-2 border-blue-100 font-semibold text-lg lg:text-xl transition-all duration-200 
                ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-50 hover:border-blue-500 hover:shadow-md active:bg-blue-100'}
                text-gray-800`}
            >
              <span className="inline-block w-8 text-blue-500 font-black">{String.fromCharCode(65 + idx)}.</span> {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar (Timer Visual) */}
      <div className="w-full max-w-2xl mt-8 bg-white/20 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ease-linear ${timeLeft > 7 ? 'bg-green-400' : timeLeft > 3 ? 'bg-yellow-400' : 'bg-red-500'}`}
          style={{ width: `${(timeLeft / TIME_LIMIT) * 100}%` }}
        ></div>
      </div>
      
    </div>
  );
};

export default ActiveQuiz;
