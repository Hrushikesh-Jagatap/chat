// server.js
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');

// mongoose.set('strictQuery', false);

const Message = require('./src/apis/models/MessageModel');
const Chat = require('./src/apis/models/ChatModel');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketio(server);

mongoose.connect('mongodb+srv://Intellie_dev_db:inteli123@cluster0.aycly9f.mongodb.net/chat?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

io.on('connection', (socket) => {
  console.log('A user connected.');

  socket.on('createRoom', async (roomName, roomId, creatorUserId) => {
    try {
      const newChat = new Chat({
        chatName: roomName,
        chatId: roomId,
        isGroupChat: true,
        users: [creatorUserId],
      });

      await newChat.save();
      socket.join(roomName);
      io.emit('createRoom', roomName, roomId);
    } catch (error) {
      console.error('Error creating chat room:', error);
    }
  });

  socket.on('joinRoom', async (roomName, userId) => {
    try {
      const chat = await Chat.findOne({ chatId: roomName });

      if (chat) {
        if (!chat.users.includes(userId)) {
          chat.users.push(userId);
          await chat.save();
        }
        socket.join(roomName);
        io.emit('joinRoom', roomName, userId);
      } else {
        console.error('Error joining chat room: Chat not found');
      }
    } catch (error) {
      console.error('Error joining chat room:', error);
    }
  });

  socket.on('sendMessage', async (roomId, message) => {
    try {
      const newMessage = new Message({
        senderId: message.sender_id,
        sender_name: message.sender_name,
        content: message.content,
        chatId: roomId,
      });

      await newMessage.save();
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

const PORT = 8004;
const serverInstance = server.listen(PORT, () => {
  console.log(`Server is connected to Port ${PORT}`);
});
