const MsgService = require('@root/src/apis/services/v1/getMsgById');

const { HttpResponseHandler } = require('intelli-utility');

// Controller function to get a  ChatDetails List
const getMsgById = async (req, res, next) => {
    try {
        const message = await MsgService.messageDetails(req.params.messageId);

        if (!message) {
            return HttpResponseHandler.success(req, res, message);
        }
        return HttpResponseHandler.success(req, res, message);

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getMsgById
};
