import { Server } from 'socket.io';
import cors from 'cors';

import basketController from '../Controllers/basket.js';
import gameModule from '../Models/Game/game.js';
import commentsModule from '../Models/Comments/comments.js';
import { server } from '../../index.js';
import { corsOptions } from '../../index.js';

const cleanCartTimeout = 100000;

const socketConnection = () => {
  const io = new Server(server, {
    cors: {
      origin: corsOptions,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    },
  });
  io.on('connection', (socket) => {
    socket.on('buyingGame', async ({ id }) => {
      const newGameInfo = await gameModule.getById(id);
      io.emit('newGameInfo', newGameInfo);
    });
    setTimeout(
      () => socket.emit('clearedCart', basketController.removeAllGamesFromCart),
      cleanCartTimeout,
    );

    socket.on('addNewComment', async (params) => {
      const gameComments = await commentsModule.getAll(params);
      io.emit('newComments', gameComments);
    });
  });
};
export default socketConnection;
