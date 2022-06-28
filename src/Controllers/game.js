import gameModule from '../Models/Game/game.js';
import authorModule from '../Models/Author/author.js';
import genreModule from '../Models/Genre/genre.js';
import discountModule from '../Models/Discount/discount.js';
import appError from '../Errors/appError.js';

class Game {
  async getAll({ query, query: { limit, page } }, res, next) {
    try {
      const dataLimit = limit && /[0-9]+/.test(limit) && parseInt(limit) ? parseInt(limit) : null;
      const currentPage = page && /[0-9]+/.test(page) && parseInt(page) ? parseInt(page) : 1;
      const options = { dataLimit, currentPage, ...query };
      const discounts = await discountModule.getAll();
      if (discounts) {
        await Promise.all(
          discounts.map(async({ id, gameId, startDiscount, endDiscount }) => {
            if (new Date(endDiscount).getTime() <= Date.now()) {
              return discountModule.delete(id);
            }
            const discountedGame = await gameModule.getById(gameId);
            if (discountedGame.discountId) {
              return;
            }
            if (Date.now() >= new Date(startDiscount).getTime()) {
              return gameModule.update({ discountId: id, gameId });
            }
          }),
        );
      }
      const games = await gameModule.getAll(options);
      if (!games) {
        next(appError.notFound('Games does not exists'));
      }
      res.status(200).json(games);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async getById(req, res, next) {
    try {
      if (!req.params.id) {
        next(appError.badRequest('Id was not set'));
      }
      const game = await gameModule.getById(req.params.id);
      if (!game) {
        next(appError.notFound('Selected game does not exist'));
      }
      res.status(200).json(game);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const author = await authorModule.getOne({ name: req.body.authorName });
      const genre = await genreModule.getOne({ name: req.body.genreName });
      const game = await gameModule.create({
        authorId: author.id,
        genreId: genre.id,
        ...req.body,
      });
      const createdGame = await gameModule.getById(game.id);
      res.status(201).json(createdGame);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const author = await authorModule.getOne({ name: req.body.authorName });
      const genre = await genreModule.getOne({ name: req.body.genreName });
      await gameModule.update({
        gameId: req.params.id,
        authorId: author.id,
        genreId: genre.id,
        ...req.body,
      });
      const updatedGame = await gameModule.getById(req.params.id);
      if (!updatedGame) {
        next(appError.notFound('Selected game does not exist'));
      }
      return res.status(200).json(updatedGame);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) {
        next(appError.badRequest('Id was not set'));
      }
      const game = await gameModule.getById(req.params.id);
      if (!game) {
        next(appError.notFound('Selected game does not exist'));
      }
      await gameModule.delete(req.params.id);
      res.status(200).json(game);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }
}

export default new Game();
