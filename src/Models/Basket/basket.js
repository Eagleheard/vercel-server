import { Basket as basketModel } from './index.js';
import { Game as gameModel } from '../Game/index.js';
import { Discount as discountModule } from '../Discount/index.js';

class Basket {
  create({ game, user, quantity }) {
    if (game.disk) {
      game.decrement('count', { by: quantity });
    }
    return basketModel.create({
      gameId: game.id,
      userId: user.id,
      quantity,
    });
  }

  getOne({ user, game }) {
    return basketModel.findOne({
      where: {
        userId: user.id,
        gameId: game.id,
      },
      include: {
        model: gameModel,
        attributes: ['id', 'name', 'count', 'price', 'image', 'disk', 'digital'],
      },
    });
  }

  getAll({ user }) {
    return basketModel.findAll({
      where: {
        userId: user.id,
      },
      order: [['id', 'DESC']],
      include: {
        model: gameModel,
        include: {
          model: discountModule,
        },
      },
    });
  }

  delete({ user, game }) {
    const where = {};
    if (user) {
      where.userId = user.id;
    }
    if (game) {
      where.gameId = game.id;
    }
    return basketModel.destroy({ where });
  }
}

export default new Basket();
