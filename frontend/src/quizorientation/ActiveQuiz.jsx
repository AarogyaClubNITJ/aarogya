import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';

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
        setQuestion(data.nextQuestion);
        sessionStorage.setItem('currentQuestion', JSON.stringify(data.nextQuestion));
        startTimer();
      }
    } catch (err) {
      console.error(err);
      setGameOver(true);
    }
    setLoading(false);
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-[#eaf8fa] flex flex-col items-center justify-center p-6 text-center font-Basic overflow-hidden">
        {completed && <Confetti width={windowSize.width} height={windowSize.height} colors={['#4BC1E2', '#406ED5', '#000000']} />}
        
        <motion.div 
          initial={{ scale: 0.5, opacity: 0, rotate: 5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="bg-white p-8 rounded-3xl shadow-custom border-4 border-black max-w-lg w-full relative z-10"
        >
          {completed ? (
            <>
              <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-widest text-[#406ED5] drop-shadow-md">Victory! 🏆</h1>
              <p className="text-xl text-black mb-6 font-bold">You conquered the challenge.</p>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-widest text-red-600 drop-shadow-md">Game Over! 💀</h1>
              <p className="text-xl text-black mb-6 font-bold">One wrong move (or tab switch) and you're out!</p>
            </>
          )}
          
          <div className="text-7xl font-black text-[#4BC1E2] mb-2 drop-shadow-md">{score}</div>
          <div className="text-black font-black mb-8 tracking-widest uppercase border-b-4 border-black inline-block pb-1">Final Score</div>
          
          <p className="text-[#406ED5] font-black text-lg uppercase tracking-wider">Check the main screen for the Leaderboard!</p>
        </motion.div>
      </div>
    );
  }

  if (!question) return (
    <div className="min-h-screen bg-[#eaf8fa] flex items-center justify-center font-Basic">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-16 h-16 border-8 border-t-[#4BC1E2] border-r-[#406ED5] border-b-black border-l-transparent rounded-full"></motion.div>
    </div>
  );

  const timerColor = timeLeft > 7 ? 'text-black' : timeLeft > 3 ? 'text-orange-500' : 'text-red-600';
  const barColor = timeLeft > 7 ? 'bg-[#4BC1E2]' : timeLeft > 3 ? 'bg-orange-400' : 'bg-red-500';

  return (
    <div className="min-h-screen bg-[#eaf8fa] flex flex-col items-center p-4 lg:p-8 font-Basic overflow-hidden">
      
      {/* Top Bar: Score & Timer */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-3xl flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-[4px_4px_0_rgba(0,0,0,1)] border-4 border-black"
      >
        <div className="flex flex-col items-start px-2">
          <span className="text-black text-sm font-black uppercase tracking-widest">Score</span>
          <span className="text-4xl font-black text-[#4BC1E2] drop-shadow-sm">{score}</span>
        </div>
        <div className="flex flex-col items-end px-2">
          <span className="text-black text-sm font-black uppercase tracking-widest">Time</span>
          <motion.span 
            key={timeLeft}
            animate={{ scale: timeLeft <= 3 ? [1, 1.2, 1] : 1 }}
            className={`text-4xl font-black ${timerColor}`}
          >
            {timeLeft}s
          </motion.span>
        </div>
      </motion.div>

      {/* Progress Bar (Timer Visual) */}
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className="w-full max-w-3xl mb-8 bg-white rounded-full h-4 border-2 border-black overflow-hidden shadow-[2px_2px_0_rgba(0,0,0,1)]">
        <div 
          className={`h-full transition-all duration-1000 ease-linear ${barColor}`}
          style={{ width: `${(timeLeft / TIME_LIMIT) * 100}%` }}
        ></div>
      </motion.div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={question.id}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="w-full max-w-3xl bg-white rounded-3xl shadow-custom border-4 border-black p-6 lg:p-10"
        >
          <h2 className="text-2xl lg:text-3xl font-black text-black mb-8 leading-relaxed tracking-wide">
            {question.question}
          </h2>
          
          <div className="space-y-4">
            {question.options.map((opt, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                onClick={() => submitAnswer(idx)}
                className={`w-full text-left p-4 lg:p-5 rounded-2xl border-4 border-black font-black text-lg lg:text-xl transition-colors duration-150 shadow-[4px_4px_0_rgba(0,0,0,1)]
                  ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#4BC1E2] hover:text-black bg-white'}
                  text-black`}
              >
                <span className="inline-block w-8 text-[#406ED5] font-black">{String.fromCharCode(65 + idx)}.</span> {opt}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      
    </div>
  );
};

export default ActiveQuiz;
