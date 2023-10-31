const express = require('express');

const router = express.Router();

const group = require('./group');

const oneToOne = require('./oneToOne');

const createChat = require('./createChat');

const getChats = require('./getChats');

const getChatDetails = require('./getChatDetails');

const updateChat = require('./updateChat');

const getChatById = require('./getChatById');

const createMessage = require('./createMessage')

const getMsgById = require('./getMsgById');

const updateMsgById = require('./updateMsgById');

// const deleteChat = require('./deleteChat');

router.use('/', updateMsgById);

router.use('/', getMsgById);

router.use('/', createMessage);

router.use('/', createChat);

router.use('/', getChats);

router.use('/', getChatDetails);

router.use('/', updateChat);

// router.use('/', deleteChat);

router.use('/', group);

router.use('/', oneToOne);

router.use('/', getChatById);

module.exports = router;