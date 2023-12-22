const MsgData = require('@root/src/apis/models/MessageModel');
const io = require('socket.io')(); // Initialize the socket.io server

// Service function to create a new message in a Chat group
const createMsg = async (msgBody) => {
  try {
    const newMsg = await MsgData.create(msgBody);
    
    // Extract the chatId from msgBody
    const chatId = msgBody.chatId;

    // Emit the new message to the specific chat group
    io.to(chatId).emit('message', newMsg);

    return newMsg;
  } catch (error) {
    throw new Error('Failed to create Message');
  }
};

module.exports = {
  createMsg,
};
