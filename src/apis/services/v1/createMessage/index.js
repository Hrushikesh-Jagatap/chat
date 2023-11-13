const MsgData = require('@root/src/apis/models/MessageModel');
// const io = require('socket.io')(server); // Assuming 'server' is your HTTP server instance

// Service function to create a new message in a Chat group
const createMsg = async (Msgbody) => {
  try {
    const { chatId, message } = Msgbody; // Assuming 'message' is a property of 'Msgbody'
    const newMsg = await MsgData.create(Msgbody);

    // Emit the new message to the chat room
    // io.to(chatId).emit('message', newMsg);

    return newMsg;
  } catch (error) {
    throw new Error('Failed to create Message');
  }
};

module.exports = {
  createMsg
};
