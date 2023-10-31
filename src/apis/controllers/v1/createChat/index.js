
const ChatService = require('@root/src/apis/services/v1/createChat');

const { HttpResponseHandler } = require('intelli-utility');

// Controller function to create a new Chat
const createChat = async (req, res, next) => {
    try {

        const { chatName, isGroupChat, users, groupAdmin } = req.body;

        const newChat = await ChatService.createChat(req.body);

        if (!newChat) {
            return HttpResponseHandler.success(req, res, newChat);
        }
        return HttpResponseHandler.success(req, res, newChat);

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createChat
};
