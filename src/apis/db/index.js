/* eslint-disable object-curly-newline */
/* eslint-disable no-console */
const mongoose = require('mongoose');

const Chat = require('@models/ChatModel')
const config = require('@config');

const { Logger: log, reqFormat } = require('intelli-utility');
// eslint-disable-next-line no-unused-vars
const { USERNAME, PASSWORD, CLUSTER, url } = config.mongodb;

class db {
  constructor() {
    if (!db.instance) {
      db.instance = this;
    }
    // eslint-disable-next-line no-constructor-return
    return db.instance;
  }

  static getInstance() {
    return this.instance;
  }

  connect() {
    mongoose.set('strictQuery', true);

    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { connection } = mongoose;
    connection.on('error', console.error.bind(console, 'connection error: '));
    connection.once('open', () => {
      log.info('chat is connected to MonogoDB');
    });

    this.Chat = this.ChatModel;
  }
}

module.exports = db;
