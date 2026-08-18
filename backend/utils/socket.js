let io;

module.exports = {
  init: (server) => {
    const { Server } = require('socket.io');
    io = new Server(server, {
      cors: {
        origin: ['http://aarogya-vert.vercel.app', 'https://aarogya-vert.vercel.app', 'http://localhost:5173', 'http://localhost:5174', 'https://www.aarogyanitj.in', 'https://aarogyanitj.in'],
        methods: ['GET', 'POST'],
        credentials: true
      }
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  }
};
