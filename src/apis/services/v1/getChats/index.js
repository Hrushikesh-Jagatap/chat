const ChatData = require('@root/src/apis/models/ChatModel')

// Service function to list Chat group
const chatList = async () => {
  try {
    const chatList = await ChatData.find();
    return chatList;
  } catch (error) {
    throw new Error('Failed to get Chat List');
  }
};

module.exports = {
  chatList
};
