const mongoose = require('mongoose');
// senderId, 
const messageModel = mongoose.Schema({
    senderId: {
        type: String,
    },

    sender_name: {
        type: String
    },

    content: {
        type: String,
        trim: true,
    },

    chatId: {
        type: String,
        ref: 'chat'
    },

},
    { timestamps: true }
);

const Message = mongoose.model('Message', messageModel);

module.exports = Message;

