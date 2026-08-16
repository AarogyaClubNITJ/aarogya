import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { QRCodeSVG } from 'qrcode.react';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const socket = io(apiUrl);

const DisplayScreen = () => {
  const [qrToken, setQrToken] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/orientation/admin');
      return;
    }

    // Fetch initial QR token
    const fetchQR = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/admin/qr/generate`, {
          headers: { 'Authorization': `Bearer ${adminToken}` }
        });
        const data = await res.json();
        if (data.token) {
          setQrToken(data.token);
        } else {
          // invalid token
          localStorage.removeItem('adminToken');
          navigate('/orientation/admin');
        }
      } catch (err) {
        console.error("Failed to fetch QR", err);
      }
    };
    fetchQR();

    // Fetch initial leaderboard
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/quiz/leaderboard`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setLeaderboard(data);
        } else {
          console.error("Invalid leaderboard data:", data);
        }
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
      }
    };
    fetchLeaderboard();

    // Listen for WebSocket events
    socket.on('qr_updated', (data) => {
      setQrToken(data.token);
    });

    socket.on('leaderboard_update', (data) => {
      if (Array.isArray(data)) {
        setLeaderboard(data);
      }
    });

    return () => {
      socket.off('qr_updated');
      socket.off('leaderboard_update');
    };
  }, [navigate]);

  const joinUrl = `${window.location.origin}/orientation/join?token=${qrToken}`;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row font-sans">
      
      {/* Left side: QR Code */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-900 to-black border-r border-gray-700">
        <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          Orientation Quiz
        </h1>
        <p className="text-xl lg:text-2xl text-gray-300 mb-12 text-center font-medium max-w-md">
          Scan the QR code to join the sudden-death challenge!
        </p>

        <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-2xl relative">
          <div className="absolute inset-0 bg-blue-500 rounded-3xl blur-xl opacity-30 -z-10 animate-pulse"></div>
          {qrToken ? (
            <QRCodeSVG value={joinUrl} size={300} />
          ) : (
            <div className="w-[300px] h-[300px] flex items-center justify-center text-black">
              Generating...
            </div>
          )}
        </div>
        <p className="mt-8 text-gray-400 text-lg animate-bounce">
          Auto-refreshes when scanned!
        </p>
      </div>

      {/* Right side: Live Leaderboard */}
      <div className="w-full md:w-1/2 p-8 flex flex-col items-center bg-gray-900">
        <h2 className="text-4xl lg:text-5xl font-bold mb-10 text-yellow-400 drop-shadow-lg flex items-center gap-3">
          🏆 Live Leaderboard
        </h2>
        
        <div className="w-full max-w-xl space-y-4">
          {!Array.isArray(leaderboard) || leaderboard.length === 0 ? (
            <p className="text-center text-gray-500 text-xl">Waiting for players to finish...</p>
          ) : (
            leaderboard.map((user, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-4 lg:p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-[1.02] ${
                  index === 0 ? 'bg-gradient-to-r from-yellow-600 to-yellow-500' :
                  index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-300 text-gray-900' :
                  index === 2 ? 'bg-gradient-to-r from-orange-700 to-orange-500' :
                  'bg-gray-800'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`text-2xl lg:text-3xl font-black ${index === 1 ? 'text-gray-900' : 'text-white'}`}>
                    #{index + 1}
                  </span>
                  <div>
                    <h3 className={`text-xl lg:text-2xl font-bold ${index === 1 ? 'text-gray-900' : 'text-white'}`}>
                      {user.name}
                    </h3>
                    <p className={`text-sm ${index === 1 ? 'text-gray-700' : 'text-gray-300'}`}>
                      {user.rollNo} {user.instaHandle && `| @${user.instaHandle}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl lg:text-3xl font-black ${index === 1 ? 'text-gray-900' : 'text-white'}`}>
                    {user.score}
                  </div>
                  <div className={`text-sm ${index === 1 ? 'text-gray-700' : 'text-gray-300'}`}>
                    {user.timeTaken ? (user.timeTaken / 1000).toFixed(1) + 's' : ''}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayScreen;
