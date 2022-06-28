import { DataTypes } from 'sequelize';
import { database } from '../../Config/database.js';

import { UserAchievement } from './userAchievementModel.js';

export const Achievement = database.define('achievement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(25),
    unique: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  trigger: {
    type: DataTypes.INTEGER,
  },
  discount: {
    type: DataTypes.DOUBLE,
  },
});

Achievement.hasMany(UserAchievement);
UserAchievement.belongsTo(Achievement);
