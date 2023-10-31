const ChatData = require('@root/src/apis/models/MessageModel')

// Service function to update Msg By Id 

const updateMsg = async () => {
    try {
        const msg = await ChatData.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return msg;
    } catch (error) {
        throw new Error('Failed to update Message');
    }
};

module.exports = {
    updateMsg
};
