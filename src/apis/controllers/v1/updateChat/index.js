
const ChatService = require('@root/src/apis/services/v1/updateChat');

const { HttpResponseHandler } = require('intelli-utility');

const updateChat = async (req, res, next) => {
    try {
        const chat = await ChatService.updateChat(req.body);
        if (!chat) {
            return HttpResponseHandler.success(req, res, chat);
        }
        return HttpResponseHandler.success(req, res, chat);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    updateChat
}