const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const path = require('path');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MOBGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define a schema for the chat message
const MessageSchema = new mongoose.Schema({
  roomId: String,
  username: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', MessageSchema);

const rooms = [];

// Set up WebSocket server
io.on('connection', (socket) => {
  console.log('A user connected');
socket.on('leaveRoom', ({ roomId, username }) => {
    console.log(`User ${username} left room ${roomId}`);
    socket.leave(roomId);

    const room = rooms.find(room => room.id === roomId);
    if (room) {
      const userIndex = room.users.findIndex(user => user === username);
      if (userIndex !== -1) {
        room.users.splice(userIndex, 1);
        io.to(roomId).emit('users', room.users);
      }
    }
  io.to(roomId).emit('users', room.users);
  });
  // Join a room
  socket.on('joinRoom', async ({ roomId, username }) => {
    const existingRoom = await rooms.find(room => room.id === roomId);
    const usernames = existingRoom ? existingRoom.users : [];

    if (!existingRoom) {
      rooms.push({
        id: roomId,
        users: [username],
      });
    } else {
      existingRoom.users = [...usernames, username];
    }

    console.log(`User ${username} joined room ${roomId}`);
    socket.join(roomId);

    // Fetch and emit previous messages
    const messages = await Message.find({ roomId }).sort({ timestamp: 1 });
    socket.emit('previousMessages', messages);

    // Notify other users in the room about the new user
    
    socket.to(roomId).emit('userJoined', username);

  // Send a message
  socket.on('sendMessage', async ({ roomId, message, username }) => {
    console.log(`Message from ${username} in room ${roomId}: ${message}`);

    // Save the message to MongoDB
    const newMessage = new Message({ roomId, username, message });
    await newMessage.save();

    // Broadcast the message to all clients in the room
    io.to(roomId).emit('receivedMessage', {
      username,
      message,
      timestamp: newMessage.timestamp,
    });
  });
    io.to(roomId).emit('users', existingRoom?.users);
    });
  // Disconnect
  socket.on('disconnect', () => {
    const roomId = socket.data.roomId;
    const username = socket.data.username;

    const room = rooms.find(room => room.id === roomId);
    if (room) {
      const userIndex = room.users.findIndex(user => user === username);
      if (userIndex !== -1) {
        room.users.splice(userIndex, 1);
        io.to(roomId).emit('users', room.users);
      }
    }
  });  
});

// Start the server
const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});