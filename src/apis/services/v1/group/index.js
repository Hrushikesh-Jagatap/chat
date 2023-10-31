const Chat = require('@root/src/apis/models/ChatModel');

async function addUserToChat(chatId, userId) {
  try {
    D
    const chat = await Chat.findById(chatId);

    if (!chat) {
      throw new Error('Chat group not found');
    }

    if (chat.members.includes(userId)) {
      throw new Error('User is already a member of this chat group');
    }

    chat.members.push(userId);

    await chat.save();

    return chat;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addUserToChat
};
