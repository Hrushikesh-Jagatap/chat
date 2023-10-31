const express = require('express');

const router = express.Router();

const updateChatController = require('@controllers/v1/updateChat')

router.put('/:id', async (req, res, next) => {
    try {
        const chatList = await updateChatController.updateChat(req, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
