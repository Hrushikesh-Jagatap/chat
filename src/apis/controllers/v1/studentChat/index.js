const MsgService = require('@root/src/apis/services/v1/studentChat');

const { HttpResponseHandler } = require('intelli-utility');

// Controller function to get a  ChatDetails List
const getUserChats = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const message = await MsgService.getUserChats(userId);
        
        if (!message) {
            return HttpResponseHandler.success(req, res, message);
        }
        return HttpResponseHandler.success(req, res, message);

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUserChats};
