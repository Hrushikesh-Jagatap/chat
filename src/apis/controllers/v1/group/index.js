const ChatService = require('@root/src/apis/services/v1/group');

const { HttpResponseHandler } = require('intelli-utility');


const addUserTogroup = async (req, res, next) => {
    try {

        const { chatId } = req.params;
        const { userId } = req.body;

        const addgroup = await ChatService.addUserToChat(chatId, userId);

        if (!addgroup) {
            return HttpResponseHandler.success(req, res, addgroup);
        }
        return HttpResponseHandler.success(req, res, addgroup);

    } catch (error) {
        next(error);
    }
};

module.exports = {
    addUserTogroup
};
