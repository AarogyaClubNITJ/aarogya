import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrientationJoin = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    instaHandle: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStart = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('No QR token found. Please scan the QR code on the screen again.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/quiz/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, ...formData })
      });
      const data = await res.json();
      
      if (data.success) {
        sessionStorage.setItem('quizSession', data.sessionToken);
        sessionStorage.setItem('currentQuestion', JSON.stringify(data.question));
        sessionStorage.setItem('lifelines', data.lifelines || 3);
        navigate('/orientation/play');
      } else {
        setError(data.error || 'Failed to start quiz');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#eaf8fa] flex items-center justify-center p-4 font-Basic overflow-hidden relative">
      
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-32 h-32 bg-[#406ED5] rounded-full blur-3xl opacity-20"
      />
      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-40 h-40 bg-[#4BC1E2] rounded-full blur-3xl opacity-20"
      />

      <motion.div 
        initial={{ scale: 0.8, opacity: 0, rotate: -2 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 12 }}
        className="bg-white rounded-3xl shadow-custom border-4 border-black p-8 w-full max-w-md relative z-10"
      >
        <h1 
          className="text-4xl lg:text-5xl font-black mb-2 text-center tracking-wide uppercase text-[#4BC1E2] drop-shadow-md"
        >
          JOIN THE QUIZ
        </h1>
        <p className="text-gray-700 text-center mb-8 font-bold text-lg">
          Enter details to start. Don't blink!
        </p>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 text-red-600 border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-4 rounded-xl mb-6 text-center font-bold"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleStart} className="space-y-5">
          <div>
            <label className="block text-black font-black mb-2 text-lg uppercase tracking-wide">Full Name *</label>
            <input 
              type="text" name="name"
              className="w-full px-4 py-3 rounded-xl bg-white border-2 border-black focus:outline-none focus:ring-4 focus:ring-[#4BC1E2]/40 font-bold text-black"
              placeholder="e.g. Adarsh Kumar"
              value={formData.name} onChange={handleChange} required
            />
          </div>
          <div>
            <label className="block text-black font-black mb-2 text-lg uppercase tracking-wide">Email *</label>
            <input 
              type="email" name="email"
              className="w-full px-4 py-3 rounded-xl bg-white border-2 border-black focus:outline-none focus:ring-4 focus:ring-[#4BC1E2]/40 font-bold text-black"
              placeholder="e.g. adarsh@example.com"
              value={formData.email} onChange={handleChange} required
            />
          </div>
          <div>
            <label className="block text-black font-black mb-2 text-lg uppercase tracking-wide">Roll Number *</label>
            <input 
              type="text" name="rollNo"
              className="w-full px-4 py-3 rounded-xl bg-white border-2 border-black focus:outline-none focus:ring-4 focus:ring-[#4BC1E2]/40 font-bold text-black"
              placeholder="e.g. 12345678"
              value={formData.rollNo} onChange={handleChange} required
            />
          </div>
          <div>
            <label className="block text-black font-black mb-2 text-lg uppercase tracking-wide">Instagram <span className="text-sm opacity-60">(Optional)</span></label>
            <input 
              type="text" name="instaHandle"
              className="w-full px-4 py-3 rounded-xl bg-white border-2 border-black focus:outline-none focus:ring-4 focus:ring-[#4BC1E2]/40 font-bold text-black"
              placeholder="@username"
              value={formData.instaHandle} onChange={handleChange}
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98, y: 0 }}
            type="submit"
            disabled={loading}
            className={`w-full bg-[#406ED5] text-white font-black tracking-widest uppercase text-xl py-4 rounded-xl border-4 border-black shadow-[6px_6px_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_rgba(0,0,0,1)] transition-all mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'STARTING...' : 'START QUIZ 🚀'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default OrientationJoin;
