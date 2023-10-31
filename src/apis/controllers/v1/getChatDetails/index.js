
const ChatService = require('@root/src/apis/services/v1/getChatDetails');

const { HttpResponseHandler } = require('intelli-utility');

// Controller function to get a  ChatDetails List
const getChatDetails = async (req, res, next) => {
    try {
        const chatDetails = await ChatService.chatDetails(req.params.id);

        if (!chatDetails) {
            return HttpResponseHandler.success(req, res, chatDetails);
        }
        return HttpResponseHandler.success(req, res, chatDetails);

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getChatDetails
};
