
const express = require('express');

const router = express.Router();

const getChatByIdController = require('@controllers/v1/getChatById')

router.get('/:chatId', async (req, res, next) => {  
    try {
        const chatDetails = await getChatByIdController.getChatById(req, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
