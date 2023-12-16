require('module-alias/register');
const express = require('express');
const config = require('./src/config');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const Message = require('./src/apis/models/MessageModel');
const Chat = require('./src/apis/models/ChatModel');
const { Logger, ErrorHandler: { BaseError, INTERNAL_SERVER_ERROR, PAGE_NOT_FOUND_ERROR } } = require('intelli-utility');
const InitApp = require('./src/InitApp');

const router = require('./src/apis/routes');
const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json()); // Add this line

const server = http.createServer(app);
const io = socketio(server);

mongoose.connect('mongodb+srv://Intellie_dev_db:inteli123@cluster0.aycly9f.mongodb.net/chat?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

io.on('connection', (socket) => {
  console.log('A user connected.');

  socket.on('createRoom', (roomName, roomId) => {
    const newChat = new Chat({
      chatName: roomName,
      chatId: roomId,
      isGroupChat: true,
      users: [socket.id],
    });

    newChat.save((err, chat) => {
      if (!err) {
        socket.join(roomName);
        io.emit('createRoom', roomName, roomId);
      } else {
        console.error('Error creating chat room:', err);
      }
    });
  });

  socket.on('joinRoom', (roomName, userId) => {
    Chat.findOne({ chatId: roomName }, (err, chat) => {
      if (!err && chat) {
        chat.users.push(userId);
        chat.save();
        socket.join(roomName);
        io.emit('joinRoom', roomName, userId);
      } else {
        console.error('Error joining chat room:', err);
      }
    });
  });

  socket.on('sendMessage', (roomId, message) => {
    const newMessage = new Message({
      senderId: socket.id,
      sender_name: message.sender,
      content: message.text,
      chatId: roomId,
    });

    try {
      newMessage.save();
      io.to(roomId).emit('message', newMessage);
    } catch (error) {
      console.error('Error saving message to MongoDB:', error);
    }
  });

  socket.on('getChatHistory', async (roomId) => {
    try {
      const messages = await Message.find({ chatId: roomId }).exec();
      socket.emit('chatHistory', messages);
    } catch (error) {
      console.error('Error retrieving chat history from MongoDB:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});

// API to create a new chat room
app.post('/api/createRoom', (req, res) => {
  const { roomName, roomId, creatorUserId } = req.body;

  const newChat = new Chat({
    chatName: roomName,
    chatId: roomId,
    isGroupChat: true,
    users: [creatorUserId],
  });

  newChat.save((err, chat) => {
    if (!err) {
      io.emit('createRoom', roomName, roomId);
      return res.status(201).json({ message: 'Chat room created successfully' });
    } else {
      console.error('Error creating chat room:', err);
      return res.status(500).json({ message: 'Failed to create chat room' });
    }
  });
});

// API to join an existing chat room
app.post('/api/joinRoom', async (req, res) => {
  try {
    const { roomName, userId } = req.body;

    // Check if the user is already in the chat
    const chat = await Chat.findOne({ chatId: roomName });

    if (chat && chat.users.includes(userId)) {
      return res.status(400).json({ message: 'User already added to the chat' });
    }

    // If not, proceed to add the user
    if (chat) {
      chat.users.push(userId);
      await chat.save();
      io.emit('joinRoom', roomName, userId);
      return res.status(200).json({ message: 'Joined chat room successfully' });
    } else {
      console.error('Error joining chat room: Chat not found');
      return res.status(404).json({ message: 'Chat room not found' });
    }
  } catch (error) {
    console.error('Error joining chat room:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/chats/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Retrieve all chat documents for the specified userId
    const chats = await Chat.find({ users: userId });

    res.json({ success: true, data: chats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// ... (the rest of your existing code)

// Start the server
const serverInstance = app.listen(PORT, () => {
  console.log( `msg: Server is connected to Port ${PORT}`);
});

// If you're using this for unit testing, you can export the server instance
module.exports = serverInstance;