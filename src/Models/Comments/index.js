import { DataTypes } from 'sequelize';
import { database } from '../../Config/database.js';

export const Comment = database.define(
  'comment',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING(100),
      allowNull: false,
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
