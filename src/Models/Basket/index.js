import { database } from '../../Config/database.js';
import { DataTypes } from 'sequelize';

export const Basket = database.define('basket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
});
