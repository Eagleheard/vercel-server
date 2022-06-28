import orderModule from '../Models/Order/order.js';
import basketModule from '../Models/Basket/basket.js';
import achievementModule from '../Models/Achievement/achievement.js';
import userAchievementModule from '../Models/Achievement/userAchievement.js';

import appError from '../Errors/appError.js';

class Order {
  async create(req, res, next) {
    try {
      const user = req.user;
      const achievementParams = {};
      const cartGames = await basketModule.getAll({ user });
      const createdOrder = await Promise.all(
        cartGames.map(({ quantity, gameId }) =>
          orderModule.create({
            address: req.body.address,
            zipCode: req.body.zipCode,
            comment: req.body.comment,
            userId: user.id,
            name: user.name + ' ' + user.lastName,
            email: user.email,
            quantity: quantity ? quantity : 1,
            gameId,
          }),
        ),
      );
      const userOrders = await orderModule.getAll({ userId: user.id });
      createdOrder.forEach(({ game }) => {
        if (game.disk) {
          achievementParams.disk = 'disk';
        }
        if (game.digital) {
          achievementParams.digital = 'digital';
        }
        if (game.disk && game.digital) {
          achievementParams.edition = 'edition';
        }
      });
      achievementParams.gameCount = userOrders.reduce(
        (accumulator, { quantity }) => accumulator + quantity,
        0,
      );
      const achievements = await achievementModule.getAllAchievements(achievementParams);
      await Promise.all(
        achievements.map(async ({ id }) => {
          userAchievementModule.getOrCreate({
            id,
            achievementId: id,
            userId: user.id,
            isAchieved: true,
          });
        }),
      );
      res.status(201).json(createdOrder);
      await basketModule.delete({ user });
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }

  async userGetAll(req, res, next) {
    try {
      const user = req.user;
      const orders = await orderModule.getAll({ userId: user.id, order: req.query.order });
      res.status(200).json(orders);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }

  async adminGetAll(req, res, next) {
    try {
      const orders = await orderModule.adminGetAll({ order: req.query.order });
      res.status(200).json(orders);
    } catch (e) {
      next(appError.badRequest(e.message));
    }
  }
}

export default new Order();
