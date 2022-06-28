import appError from '../Errors/appError.js';

import gameModule from '../Models/Game/game.js';
import basketModule from '../Models/Basket/basket.js';

class Basket {
  async addGameToCart(req, res, next) {
    try {
      const user = req.user;
      const game = await gameModule.getById(req.query.gameId);
      if (!game) {
        next(appError.notFound('Game does not exists'));
      }
      const options = { game, user, quantity: req.query.value };
      let basket = await basketModule.getOne({ game, user });
      if (!basket) {
        basket = await basketModule.create(options);
      } else {
        return next(appError.badRequest('Game already in cart'));
      }
      basket = await basketModule.getOne({ game, user });
      res.status(201).json(basket);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async incrementGameToCart(req, res, next) {
    try {
      const user = req.user;
      const game = await gameModule.getOne({ gameId: req.query.gameId });
      if (!game) {
        next(appError.notFound('Games does not exists'));
      }
      let basket = await basketModule.getOne({ game, user });
      if (parseInt(game.count) !== 0) {
        basket.increment('quantity', { by: 1 });
        game.decrement('count', { by: 1 });
      } else {
        next(appError.badRequest('Required quantity does not exist'));
      }
      return res.status(200).json(basket);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async decrementGameFromCart(req, res, next) {
    try {
      const user = req.user;
      const game = await gameModule.getOne({ gameId: req.query.gameId });
      if (!game) {
        next(appError.notFound('Games does not exists'));
      }
      let basket = await basketModule.getOne({ game, user });
      if (parseInt(basket.quantity) !== 1) {
        await basket.decrement('quantity', { by: 1 });
        await game.increment('count', { by: 1 });
        await basket.reload();
      } else {
        await basketModule.delete({ user, game });
      }
      return res.status(200).json(basket);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async getCart(req, res, next) {
    try {
      const user = req.user;
      let basket = await basketModule.getAll({ user });
      if (!basket) {
        basket = await basketModule.create();
      }
      return res.status(200).json(basket);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async removeGameFromCart(req, res, next) {
    try {
      const user = req.user;
      const game = await gameModule.getOne(req.params);
      const basket = await basketModule.getOne({ user, game });
      if (!basket) {
        next(appError.badRequest('Cart not found'));
      }
      await game.increment('count', { by: basket.quantity });
      await basketModule.delete({ user, game });
      return res.status(200).json(basket);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async removeAllGamesFromCart(req, res, next) {
    try {
      const user = req.user;
      const basket = await basketModule.getAll({ user });
      if (!basket) {
        next(appError.notFound('Cart not found'));
      }
      basket.forEach(async (cartGame) => {
        cartGame = await gameModule.getOne(cartGame);
        await cartGame.increment('count', { by: basket.quantity });
      });
      await basketModule.delete({ user });
      return res.status(200).json({ message: 'Cart is cleared' });
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }
}

export default new Basket();
