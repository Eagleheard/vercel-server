import { DataTypes } from 'sequelize';
import { database } from '../../Config/database.js';

import { Genre } from '../Genre/index.js';
import { Author } from '../Author/index.js';
import { Basket } from '../Basket/index.js';
import { Order } from '../Order/index.js';
import User from '../User/index.js';
import { Comment } from '../Comments/index.js';
import { Discount } from '../Discount/index.js';

export const Game = database.define('game', {
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
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  digital: {
    type: DataTypes.BOOLEAN,
  },
  disk: {
    type: DataTypes.BOOLEAN,
  },
  count: {
    type: DataTypes.INTEGER,
  },
  popularity: {
    type: DataTypes.INTEGER,
  },
  image: {
    type: DataTypes.STRING,
  },
  isNew: {
    type: DataTypes.BOOLEAN,
  },
  isPreview: {
    type: DataTypes.BOOLEAN,
  },
  preview: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING(300),
  },
});

Genre.hasMany(Game, { onDelete: 'RESTRICT' });
Game.belongsTo(Genre, { foreignKey: 'genreId' });

Author.hasMany(Game, { onDelete: 'CASCADE' });
Game.belongsTo(Author, { foreignKey: 'authorId' });

Discount.hasOne(Game);
Game.belongsTo(Discount, { foreignKey: 'discountId' });

Game.belongsToMany(User, { through: Basket, onDelete: 'RESTRICT' });
User.belongsToMany(Game, { through: Basket, onDelete: 'RESTRICT' });

Game.hasMany(Comment);
Comment.belongsTo(Game);

User.hasMany(Comment);
Comment.belongsTo(User);

Game.hasMany(Basket);
Basket.belongsTo(Game);

Game.hasMany(Order, { onDelete: 'RESTRICT' });
Order.belongsTo(Game);
