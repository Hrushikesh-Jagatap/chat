const MsgData = require('@root/src/apis/models/MessageModel')

// Service function to Details Chat group
const messageDetails = async (messageId) => {
  try {
    const messageDetails = await MsgData.findById(messageId);
    return messageDetails;
  } catch (error) {
    throw new Error('Failed to find message Details Details');
  }
};

module.exports = {
    messageDetails
};
