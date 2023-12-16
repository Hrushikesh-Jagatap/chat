require('module-alias/register');
const express = require('express');
const config = require('./src/config');
const mongoose = require('mongoose'); // Import Mongoose
const cors = require('cors');

const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const Message = require('./src/apis/models/MessageModel'); // Replace 'path-to-your-message-model' with the actual path
const Chat = require('./src/apis/models/ChatModel'); // Replace 'path-to-your-chat-model' with the actual path

const {
  Logger,
  ErrorHandler: { BaseError, INTERNAL_SERVER_ERROR, PAGE_NOT_FOUND_ERROR },
} = require('intelli-utility');

const InitApp = require('./src/InitApp');

const router = require('./src/apis/routes');
const PORT = 5000;

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketio(server);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

io.on('connection', (socket) => {
  console.log('A user connected.');

<<<<<<< HEAD
  //Broadcast when a user connects
=======
  socket.on('createRoom',  (roomName , roomId) => {
    // Create a new chat room in MongoDB
    const newChat = new Chat({
      chatName: roomName,
      chatId: roomId, // You can use the socket id as a unique identifier
      isGroupChat: true,
      users: [socket.id], // Initially, the creator is the only user
    });
>>>>>>> e3622fd (chat socket)

    newChat.save((err, chat) => {
      if (!err) {
        socket.join(roomName);
      } else {
        console.error('Error creating chat room:', err);
      }
    });
  });

  socket.on('joinRoom', (roomName, userId ) => {
    // Join an existing chat room
    // console.log(roomName , userId)
    Chat.findOne({ chatId: roomName }, (err, chat) => {
      if (!err && chat) {
        chat.users.push(userId);
        chat.save();
        socket.join(roomName);
      } else {
        console.error('Error joining chat room:', err);
      }
    });
  });

  socket.on('sendMessage',  (roomId, message) => {
    // Store the message in MongoDB
    const newMessage = new Message({
      senderId: socket.id, // You can use the socket id as the sender's ID
      sender_name: message.sender,
      content: message.text,
      chatId: roomId, // Use roomName as the chatId
    });

    try {
       newMessage.save();
      // Broadcast the message to everyone in the room
      io.to(roomId).emit('message', newMessage);
      // console.log(newMessage)
    } catch (error) {
      console.error('Error saving message to MongoDB:', error);
    }
  });

  socket.on('getChatHistory', async (roomId) => {
    try {
      // Retrieve chat history from MongoDB
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
server.listen(PORT, () => console.log(`Server is Quannected to Port ${PORT}`));

// InitApp(app).then(() => {
//   app.use(config.node.pathPrefix, router);

//   app.use((req, res, next) => {
//     next(new PAGE_NOT_FOUND_ERROR());
//   });

//   app.use(async (error, req, res, next) => {
//     Logger.error({ error: error });
//     try {
//       if (!(error instanceof BaseError)) {
//         throw new INTERNAL_SERVER_ERROR();
//       } else throw error;
//     } catch (err) {
//       Logger.error('error inside chat-mngmt-service', err);
//       console.log('error inside chat management service:\n', err);
//       await err.handleError(req, res);
//     }
//   });

//   const serverInstance = app.listen(config.node.port, () => {
//     Logger.info({ msg: `Base URL: http://${config.node.host}:${config.node.port}${config.node.pathPrefix}` });
//   });

//   // If you're using this for unit testing, you can export the server instance
//   // module.exports = serverInstance;
// });
