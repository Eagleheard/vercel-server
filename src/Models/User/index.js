import { DataTypes } from 'sequelize';
import { database } from '../../Config/database.js';

import { Order } from '../Order/index.js';
import { Achievement } from '../Achievement/index.js';
import { UserAchievement } from '../Achievement/userAchievementModel.js';

const User = database.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'USER',
  },
  photo: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  blocked: {
    type: DataTypes.BOOLEAN,
  },
});

Achievement.belongsToMany(User, { through: UserAchievement, onDelete: 'RESTRICT' });
User.belongsToMany(Achievement, { through: UserAchievement, onDelete: 'RESTRICT' });

User.hasMany(UserAchievement);
UserAchievement.belongsTo(User);

User.hasMany(Order, { onDelete: 'SET NULL' });
Order.belongsTo(User);

export default User;
