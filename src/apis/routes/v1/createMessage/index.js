const express = require('express');

const router = express.Router();

const createMsgController = require('@controllers/v1/createMessage')

router.post('/createMessage', async (req, res, next) => {  
    try {
        const message = await createMsgController.createMsg(req, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
