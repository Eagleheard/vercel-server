import { Op } from 'sequelize';

import { Achievement as achievementModule } from './index.js';

const edition = 'edition';

class Achievement {
  getAllNotAchieved() {
    return achievementModule.findAll();
  }

  getAllAchievements({ gameCount, disk, digital }) {
    const fetchType = () => {
      const gameType = [];
      if (disk && digital) {
        gameType.push(edition);
        return gameType;
      }
      if (disk) {
        gameType.push(disk);
        return gameType;
      }
      if (digital) {
        gameType.push(digital);
        return gameType;
      }
    };
    return achievementModule.findAll({
      where: {
        [Op.or]: [
          { trigger: { [Op.lte]: [gameCount] } },
          { description: { [Op.substring]: fetchType() } },
        ],
      },
    });
  }
}

export default new Achievement();
