const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  chatName: {
    type: String,
  },
  chatId: {
    type:String
  },

  isGroupChat: {
    type: Boolean,
    default: true, // Default to true if not provided
  },

  // users: [
  //   String
  // ],
  users: [{ type: String }],
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message', // Replace 'Message' with the actual message model name
  },
  
  groupAdmin: {
    type: String
  },
}, {
  timestamps: true,
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
