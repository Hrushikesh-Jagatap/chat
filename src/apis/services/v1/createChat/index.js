const ChatData = require('@root/src/apis/models/ChatModel');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const createChat = async (chatData) => {
  try {
    // Create a new chat group using the provided data.
    const newChat = await ChatData.create(chatData);
    io.emit('message', 'You have craete new chat group');

    // Return the newly created chat group.
    return newChat;
  } catch (error) {
    // Handle and throw an error if chat group creation fails.
    throw new Error('Failed to create Chat group');
  }
};

module.exports = {
  createChat
};
