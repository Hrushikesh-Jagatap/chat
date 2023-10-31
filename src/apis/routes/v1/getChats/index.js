const express = require('express');

const router = express.Router();

const getChatController = require('@root/src/apis/controllers/v1/getChats')

router.get('/chats', async (req, res, next) => {  
    try {
        const chatList = await getChatController.getChatList(req, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
