require('module-alias/register');
const express = require('express');
const config = require('./src/config');

const path = require('path');
const http = require('http');
const socketio = require('socket.io');


const {
  Logger,
  Logger: log,
  ErrorHandler: { BaseError, INTERNAL_SERVER_ERROR, PAGE_NOT_FOUND_ERROR },
} = require('intelli-utility');

const InitApp = require('./src/InitApp');

const router = require('./src/apis/routes');

const app = express();

const server = http.createServer(app);

const io = socketio(server);

//run when client connect
io.on('connection', socket => {
  console.log('New Ws connection...');

  socket.emit('message', 'welcome to group') // welcome to current user

  //Broadcast when a user connects
  socket.broadcast.emit('message', 'A user has joined chat');

  io.emit() // this is for all client
  
  // run when client disconnect
  socket.on('disconnect', () => {
      io.emit('message', 'A user has left a chat');

  })
})

InitApp(app).then(() => {
  app.use(config.node.pathPrefix, router);

  // Todo: handle response with error handler
  app.use((req, res, next) => {
    next(new PAGE_NOT_FOUND_ERROR());
  });

  app.use(async (error, req, res, next) => {
    log.error({ error: error });
    try {
      if (!(error instanceof BaseError)) {
        throw new INTERNAL_SERVER_ERROR();
      } else throw error;
    } catch (err) {
      log.error('error inside caht-mngmt-service', err);
      console.log('error inside chat mngmt service---------\n', err);
      await err.handleError(req, res);
    }
  });

  const server = app.listen(config.node.port, () => {
    Logger.info({ msg: `Base URL: http://${config.node.host}:${config.node.port}${config.node.pathPrefix}` });
  });

  // if (config.isTest) {
  //   // For unit testing
  //   module.exports = app;
  // }
});

