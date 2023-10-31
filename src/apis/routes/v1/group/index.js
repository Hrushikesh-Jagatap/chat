const express = require('express');

const router = express.Router();

const groupaddController = require('@root/src/apis/controllers/v1/group');

router.post('/add/:chatId', async (req, res, next) => {
    try {
        const result = await groupaddController(req, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
