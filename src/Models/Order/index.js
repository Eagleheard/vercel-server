import { DataTypes } from 'sequelize';
import { database } from '../../Config/database.js';

export const Order = database.define(
  'order',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING(50),
    },
    zipCode: {
      type: DataTypes.STRING(10),
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    comment: {
      type: DataTypes.STRING(200),
    },
    formatedCreatedAt: {
      type: DataTypes.VIRTUAL,
      get() {
        const value = this.getDataValue('createdAt');
        const day = value.getDate();
        const month = value.getMonth() + 1;
        const year = value.getFullYear();
        const hours = value.getHours();
        const minutes = value.getMinutes();
        return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
      },
    },
    formatedUpdatedAt: {
      type: DataTypes.VIRTUAL,
      get() {
        const value = this.getDataValue('updatedAt');
        const day = value.getDate();
        const month = value.getMonth() + 1;
        const year = value.getFullYear();
        const hours = value.getHours();
        const minutes = value.getMinutes();
        return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
      },
    },
  },
  { timestamps: true },
);
