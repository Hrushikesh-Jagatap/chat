
const ChatData =  require('@root/src/apis/models/ChatModel')

// Service function to list Chat group
const updateChat = async () => {
  try {
    const chat = await ChatData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return chat;
  } catch (error) {
    throw new Error('Failed to update Chat List');
  }
};

module.exports = {
    updateChat
};
