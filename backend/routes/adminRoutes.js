const express = require('express');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { authenticateAdmin } = require('../middleware/authMiddleware');
const gameState = require('../utils/gameState');
const socketModule = require('../utils/socket');

const router = express.Router();

// Admin Login
router.post('/login', (req, res) => {
  const { password } = req.body;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
  const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, error: 'Invalid password' });
  }
});

// Generate QR Token (Admin Only)
let qrInterval = null;

router.get('/qr/generate', authenticateAdmin, (req, res) => {
  const generateAndBroadcast = () => {
    const newQRToken = uuidv4();
    gameState.addQRToken(newQRToken);
    
    try {
      const io = socketModule.getIO();
      io.emit('qr_updated', { token: newQRToken });
    } catch (err) {
      console.error("Socket emit failed", err);
    }
    return newQRToken;
  };

  // Generate the first one
  const initialToken = generateAndBroadcast();

  // Start the 2-second interval if not already running
  if (!qrInterval) {
    qrInterval = setInterval(generateAndBroadcast, 2000);
  }

  res.json({ token: initialToken });
});

module.exports = router;
