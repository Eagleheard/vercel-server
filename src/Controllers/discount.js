import appError from '../Errors/appError.js';

import discountModule from '../Models/Discount/discount.js';
import gameModule from '../Models/Game/game.js';

class Discount {
  async create(req, res, next) {
    try {
      if (req.body.gameName === 'All') {
        const games = await gameModule.getAll({ currentPage: null, dataLimit: null });
        const discount = await Promise.all(
          games.rows.map((game) => 
            discountModule.create({
              startDiscount: req.body.startDiscount,
              endDiscount: req.body.endDiscount,
              discountCount: req.body.discountCount,
              gameId: game.id,
              gameName: game.name,
            })
          )
        )
        return res.status(201).json(discount);
      }
      if (req.body.gameName !== 'All') {
      const game = await gameModule.getOne({ gameName: req.body.gameName });
      const discount = await discountModule.create({
        startDiscount: req.body.startDiscount,
        endDiscount: req.body.endDiscount,
        discountCount: req.body.discountCount,
        gameId: game.id,
        gameName: game.name,
      });
      return res.status(201).json([discount]);
    }
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const discount = await discountModule.getAll();
      res.status(200).json(discount);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) {
        next(appError.badRequest('Id was not set'));
      }
      const discount = await discountModule.getOne(req.params.id);
      if (!discount) {
        next(appError.notFound('Selected discount does not exist'));
      }
      await discountModule.delete(req.params.id);
      res.status(200).json(discount);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async deleteAll(req, res, next) {
    try {
      await discountModule.deleteAll();
      res.status(200).json({message: 'Successfully deleted'});
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }
}

export default new Discount();
