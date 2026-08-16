import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

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
        // Save session token and first question in state/storage
        sessionStorage.setItem('quizSession', data.sessionToken);
        sessionStorage.setItem('currentQuestion', JSON.stringify(data.question));
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
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-bl-full opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500 rounded-tr-full opacity-10"></div>

        <h1 className="text-3xl lg:text-4xl font-extrabold text-blue-900 mb-2 text-center">
          Join the Quiz!
        </h1>
        <p className="text-gray-600 text-center mb-8 font-medium">
          Enter your details to get started. Don't blink!
        </p>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6 text-center font-semibold text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleStart} className="space-y-5 relative z-10">
          <div>
            <label className="block text-blue-900 font-bold mb-2">Full Name *</label>
            <input 
              type="text"
              name="name"
              className="w-full px-4 py-3 rounded-xl bg-blue-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition font-medium"
              placeholder="e.g. Adarsh Kumar"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-blue-900 font-bold mb-2">Email Address *</label>
            <input 
              type="email"
              name="email"
              className="w-full px-4 py-3 rounded-xl bg-blue-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition font-medium"
              placeholder="e.g. adarsh@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-blue-900 font-bold mb-2">Roll Number / ID *</label>
            <input 
              type="text"
              name="rollNo"
              className="w-full px-4 py-3 rounded-xl bg-blue-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition font-medium"
              placeholder="e.g. 12345678"
              value={formData.rollNo}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-blue-900 font-bold mb-2">Instagram Handle (Optional)</label>
            <input 
              type="text"
              name="instaHandle"
              className="w-full px-4 py-3 rounded-xl bg-blue-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition font-medium"
              placeholder="@username"
              value={formData.instaHandle}
              onChange={handleChange}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-lg py-4 rounded-xl transition duration-200 shadow-xl hover:shadow-2xl mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'STARTING...' : 'START QUIZ 🚀'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrientationJoin;
