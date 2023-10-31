const express = require('express');

const router = express.Router();

const updateMsgController = require('@controllers/v1/updateMsgById')

router.put('/:messageId', async (req, res, next) => {
    try {
        const chatList = await updateMsgController.updateMsg(req, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
