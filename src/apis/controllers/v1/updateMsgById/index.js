const MsgService = require('@root/src/apis/services/v1/updateMsgById');

const { HttpResponseHandler } = require('intelli-utility');

const updateMsg = async (req, res, next) => {
    try {

        const messageId = req.params.messageId;

        const updateData = req.body

        const chat = await MsgService.updateMsg(messageId, updateData);

        if (!chat) {
            return HttpResponseHandler.success(req, res, chat);
        }

        return HttpResponseHandler.success(req, res, chat);

    } catch (error) {
        next(error);
    }
};

module.exports = {
    updateMsg
}