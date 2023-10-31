const ChatData = require('@root/src/apis/models/ChatModel')

// Service function to Details Chat group
const chatDetails = async (chatId) => {
  try {
    const chatDetails = await Chat.findById(chatId);
    return chatDetails;
  } catch (error) {
    throw new Error('Failed to find Chat Details');
  }
};

module.exports = {
  chatDetails
};
