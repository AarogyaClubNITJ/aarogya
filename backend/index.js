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
app.set('trust proxy', 1); // Trust first proxy (Render)
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketModule.init(server);

const corsOptions = {
    origin: ['http://aarogya-vert.vercel.app', 'https://aarogya-vert.vercel.app', 'http://localhost:5173', 'http://localhost:5174'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use(cors(corsOptions));

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use(limiter);
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
