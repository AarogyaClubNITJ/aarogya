const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const socketModule = require('./utils/socket');
const gameState = require('./utils/gameState');
const adminRoutes = require('./routes/adminRoutes');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketModule.init(server);

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.set('bufferCommands', false); // Fail instantly if not connected
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/orientation_quiz')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error", err));

// Routes
app.use('/api/admin', adminRoutes); // adminRoutes has /login and /qr/generate
app.use('/api/quiz', quizRoutes);

// Socket connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  // Send initial token to new display connections
  const currentQRToken = gameState.getCurrentQRToken();
  if (currentQRToken) {
    socket.emit('qr_updated', { token: currentQRToken });
  }
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
