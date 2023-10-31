
const express = require('express');

const router = express.Router();

const chatDetailsController = require('@controllers/v1/getChatDetails')

router.get('/:chatId', async (req, res, next) => {  
    try {
        const chatDetails = await chatDetailsController.getChatDetails(req, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
