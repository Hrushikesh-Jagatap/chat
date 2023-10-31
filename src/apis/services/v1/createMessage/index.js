const MsgData = require('@root/src/apis/models/MessageModel')

// Service function to create a new message in Chat group
const createMsg = async (Msgbody) => {
  try {
    const newMsg = await MsgData.create(Msgbody);
    return newMsg;
  } catch (error) {
    throw new Error('Failed to create  Message');
  }
};

module.exports = {
    createMsg
};
