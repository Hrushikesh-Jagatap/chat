const ChatData = require('@root/src/apis/models/ChatModel')

// Define the service function to get user chat details
const getUserChats = async (userId) => {
  try {
    const chats = await ChatData.find({ users: userId });
    return chats;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserChats,
};

