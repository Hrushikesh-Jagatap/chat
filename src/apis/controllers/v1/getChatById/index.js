const ChatService = require('@root/src/apis/services/v1/getChatById');

const { HttpResponseHandler } = require('intelli-utility');

// Controller function to get a  ChatDetails List
const getChatById = async (req, res, next) => {
    try {
        const ChatById = await ChatService.chatDetails(req.params.chatId);

        if (!ChatById) {
            return HttpResponseHandler.success(req, res, ChatById);
        }
        return HttpResponseHandler.success(req, res, ChatById);

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getChatById
};
