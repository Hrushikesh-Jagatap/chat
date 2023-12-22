
const express = require('express');

const router = express.Router();

const getStudentChatController = require('@controllers/v1/studentChat')

router.get('/:userId/chats', async (req, res, next) => {  
    try {
        const chatDetails = await getStudentChatController.getUserChats(req, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
