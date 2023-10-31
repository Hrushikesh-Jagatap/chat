
const express = require('express');

const router = express.Router();

const getMsgByIdController = require('@controllers/v1/getMsgById')

router.get('/:messageId', async (req, res, next) => {  
    try {
        const chatDetails = await getMsgByIdController.getMsgById(req, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
