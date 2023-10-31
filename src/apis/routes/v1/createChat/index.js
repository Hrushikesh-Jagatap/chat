const express = require('express');

const router = express.Router();

const createChatController = require('@controllers/v1/createChat')

router.post('/create', async (req, res, next) => {  
    try {
        const chat = await createChatController.createChat(req, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
