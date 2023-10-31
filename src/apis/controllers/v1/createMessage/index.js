const MsgService = require('@root/src/apis/services/v1/createMessage');

const { HttpResponseHandler } = require('intelli-utility');

// Controller function to create a new Chat
const createMsg = async (req, res, next) => {
    try {

        const { senderId, content, chatId, sender_name } = req.body;

        const newMessage = await MsgService.createMsg(req.body);

        if (!newMessage) {
            return HttpResponseHandler.success(req, res, newMessage);
        }
        return HttpResponseHandler.success(req, res, newMessage);

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createMsg
};
