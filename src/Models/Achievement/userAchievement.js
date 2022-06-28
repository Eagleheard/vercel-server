import { UserAchievement as userAchievementModule } from './userAchievementModel.js';
import { Achievement as achievementModule } from './index.js';

class UserAchievement {
  getAll(userId) {
    return userAchievementModule.findAll({
      where: { userId },
      order: [['isAchieved', 'DESC']],
      include: {
        model: achievementModule,
        attributes: ['name', 'description', 'discount'],
      },
    });
  }

  getOne(id) {
    return userAchievementModule.findOne({
      where: {
        achievementId: id,
      },
    });
  }

  create(data) {
    return userAchievementModule.create({ ...data });
  }

  getOrCreate({ id, achievementId, isAchieved, userId }) {
    return userAchievementModule.findOrCreate({
      where: {
        achievementId: id,
        userId,
      },
      defaults: {
        achievementId,
        userId,
        isAchieved,
      },
    });
  }

  update({ userId, achievementId }) {
    return userAchievementModule.update(
      {
        isAchieved: true,
      },
      {
        where: {
          userId,
          achievementId,
        },
      },
    );
  }
}
export default new UserAchievement();
