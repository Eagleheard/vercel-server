import achievementModule from '../Models/Achievement/achievement.js';
import userAchievementModule from '../Models/Achievement/userAchievement.js';

import appError from '../Errors/appError.js';

class Achievement {
  async getAll(req, res, next) {
    try {
      const user = req.user;
      if (!user) {
        next(appError.notFound('User does not exist'));
      }
      const achievement = await userAchievementModule.getAll(user.id);
      const notAchieved = await achievementModule.getAllNotAchieved();
      const allAchievements = notAchieved.filter(({ id }) =>
        achievement.every(({ achievementId }) => achievementId !== id),
      );
      return res.status(200).json([...achievement, ...allAchievements]);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }
  async create(req, res, next) {
    try {
      const user = req.user;
      if (!user) {
        next(appError.notFound('User does not exist'));
      }
      let achievement = await userAchievementModule.create(user.id);
      return res.status(201).json(achievement);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }
}

export default new Achievement();
