import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const socket = io(apiUrl);

let audioCtx = null;

const initAudio = () => {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

const playTop5Sound = () => {
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
  osc.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 0.1); // A6
  
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
  
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.6);
};

const DisplayScreen = () => {
  const [qrToken, setQrToken] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const previousTop5 = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleInteraction = () => initAudio();
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/orientation/admin');
      return;
    }

    const fetchQR = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/admin/qr/generate`, {
          headers: { 'Authorization': `Bearer ${adminToken}` }
        });
        const data = await res.json();
        if (data.token) {
          setQrToken(data.token);
        } else {
          localStorage.removeItem('adminToken');
          navigate('/orientation/admin');
        }
      } catch (err) {
        console.error("Failed to fetch QR", err);
      }
    };
    fetchQR();

    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/quiz/leaderboard`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setLeaderboard(data);
          previousTop5.current = data.slice(0, 5).map(u => u.rollNo);
        } else {
          console.error("Invalid leaderboard data:", data);
        }
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
      }
    };
    fetchLeaderboard();

    socket.on('qr_updated', (data) => {
      setQrToken(data.token);
    });

    socket.on('leaderboard_update', (data) => {
      if (Array.isArray(data)) {
        setLeaderboard(data);
        
        // Sound logic
        const currentTop5 = data.slice(0, 5).map(u => u.rollNo);
        const prevTop5 = previousTop5.current;
        
        if (prevTop5.length > 0) {
          const hasNewEntrant = currentTop5.some(rollNo => !prevTop5.includes(rollNo));
          if (hasNewEntrant) {
            playTop5Sound();
          }
        }
        previousTop5.current = currentTop5;
      }
    });

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      socket.off('qr_updated');
      socket.off('leaderboard_update');
    };
  }, [navigate]);

  const joinUrl = `${window.location.origin}/orientation/join?token=${qrToken}`;
  const top5Leaderboard = leaderboard.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#eaf8fa] flex flex-col md:flex-row font-Basic overflow-hidden">
      
      {/* Left side: QR Code */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-white border-r-4 border-black z-10"
      >
        <motion.h1 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="text-5xl lg:text-7xl font-extrabold mb-4 text-center tracking-wider text-[#406ED5] drop-shadow-md"
        >
          ORIENTATION<br />QUIZ
        </motion.h1>
        <p className="text-xl lg:text-2xl text-gray-700 mb-12 text-center font-bold max-w-md">
          Scan the QR code to join the sudden-death challenge!
        </p>

        <motion.div 
          animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="bg-white p-6 lg:p-8 rounded-3xl shadow-[8px_8px_0_rgba(0,0,0,1)] border-4 border-black relative"
        >
          {qrToken ? (
            <QRCodeSVG value={joinUrl} size={280} fgColor="#000" />
          ) : (
            <div className="w-[280px] h-[280px] flex items-center justify-center text-gray-500 font-bold text-xl">
              Generating...
            </div>
          )}
        </motion.div>
        <motion.p 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-10 text-[#4BC1E2] font-black text-xl uppercase tracking-widest drop-shadow-sm"
        >
          Auto-refreshes when scanned
        </motion.p>
      </motion.div>

      {/* Right side: Live Leaderboard */}
      <div className="w-full md:w-1/2 p-8 flex flex-col items-center bg-[#eaf8fa] overflow-y-auto">
        <motion.h2 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl lg:text-6xl font-black mb-10 tracking-wide flex items-center gap-4 text-[#4BC1E2] drop-shadow-md"
        >
          🏆 LEADERBOARD
        </motion.h2>
        
        <div className="w-full max-w-xl space-y-5 pb-10">
          {!Array.isArray(top5Leaderboard) || top5Leaderboard.length === 0 ? (
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center text-gray-500 text-2xl font-bold"
            >
              Waiting for challengers...
            </motion.p>
          ) : (
            <AnimatePresence>
              {top5Leaderboard.map((user, index) => (
                <motion.div 
                  key={index + user.rollNo}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  className="w-full"
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: index * 0.15, ease: "easeInOut" }}
                    className={`flex items-center justify-between p-4 lg:p-6 rounded-2xl shadow-[4px_4px_0_rgba(0,0,0,1)] border-4 border-black ${
                      index === 0 ? 'bg-[#4BC1E2] text-black' :
                      index === 1 ? 'bg-slate-200 text-black' :
                      index === 2 ? 'bg-orange-300 text-black' :
                      'bg-white text-black'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <span className="text-3xl lg:text-4xl font-black text-white" style={{ WebkitTextStroke: '2px black' }}>
                        #{index + 1}
                      </span>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-black uppercase tracking-wide">
                          {user.name}
                        </h3>
                        <p className="text-sm font-bold opacity-80">
                          {user.rollNo} {user.instaHandle && `| @${user.instaHandle}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl lg:text-4xl font-black">
                        {user.score}
                      </div>
                      <div className="text-sm font-bold opacity-80">
                        {user.timeTaken ? (user.timeTaken / 1000).toFixed(1) + 's' : ''}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
        
        {/* Audio hint */}
        <div className="absolute bottom-4 left-4 text-gray-400 font-bold text-sm">
          🔇 Click anywhere to ensure audio is enabled
        </div>
      </div>
    </div>
  );
};

export default DisplayScreen;
