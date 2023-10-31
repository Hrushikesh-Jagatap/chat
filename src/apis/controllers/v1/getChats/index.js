
const ChatService = require('@root/src/apis/services/v1/getChats');

const { HttpResponseHandler } = require('intelli-utility');

// Controller function to get a  Chat List
const getChatList = async (req, res, next) => {
    try {
        const chatList = await ChatService.chatList();

        if (!chatList) {
            return HttpResponseHandler.success(req, res, chatList);
        }
        return HttpResponseHandler.success(req, res, chatList);

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getChatList
};
