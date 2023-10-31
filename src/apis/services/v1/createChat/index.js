const ChatData = require('@root/src/apis/models/ChatModel');

/**
 * Service function to create a new chat group.
 * @param {Object} chatData - Data to create the chat group.
 * @returns {Promise<Object>} - The newly created chat group.
 * @throws {Error} If chat group creation fails.
 */

const createChat = async (chatData) => {
  try {
    // Create a new chat group using the provided data.
    const newChat = await ChatData.create(chatData);
    
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
