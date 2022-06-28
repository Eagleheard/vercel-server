import { Op } from 'sequelize';

import { Game as gameModule } from './index.js';
import { Genre as genreModule } from '../Genre/index.js';
import { Author as authorModule } from '../Author/index.js';
import { Discount as discountModule } from '../Discount/index.js';

class Game {
  getAll({
    dataLimit,
    currentPage,
    authorId,
    genreId,
    gameId,
    isNew,
    isPreview,
    order,
    digital,
    disk,
    count,
    minPrice,
    maxPrice,
    authorName,
    genreName,
    price,
  }) {
    const offset = (currentPage - 1) * dataLimit;
    const where = {};
    let orderBy = [['id', 'ASC']];
    if (gameId) {
      where.id = gameId;
    }
    if (genreId) {
      where.genreId = genreId;
    }
    if (authorId) {
      where.authorId = authorId;
    }
    if (minPrice && maxPrice) {
      where.price = { [Op.between]: [minPrice, maxPrice] };
    } else if (minPrice) {
      where.price = { [Op.gte]: [minPrice] };
    } else if (maxPrice) {
      where.price = { [Op.lte]: [maxPrice] };
    }
    if (digital) {
      where.digital = digital;
    }
    if (disk) {
      where.disk = disk;
    }
    if (count) {
      where.count = { [Op.gte]: [count] };
    }
    if (isNew) {
      where.isNew = isNew;
    }
    if (price && price === 'lowPrice') {
      orderBy = [['price', 'ASC']];
    }
    if (price && price === 'highPrice') {
      orderBy = [['price', 'DESC']];
    }
    if (order) {
      orderBy = [[order, 'DESC']];
    }
    if (isPreview) {
      where.isPreview = isPreview;
    }
    if (authorName) {
      where['$author.name$'] = authorName;
    }
    if (genreName) {
      where['$genre.name$'] = genreName;
    }
    return gameModule.findAndCountAll({
      limit: dataLimit,
      offset,
      order: orderBy,
      where,
      include: [
        { model: genreModule, as: 'genre' },
        { model: authorModule, as: 'author' },
        { model: discountModule, as: 'discount' },
      ],
    });
  }

  getOne({ gameId, value, gameName }) {
    const where = {};
    if (gameId) {
      where.id = gameId;
    }
    if (value) {
      where.count = { [Op.gte]: [value] };
    }
    if (gameName) {
      where.name = gameName;
    }
    return gameModule.findOne({ where });
  }

  getById(id) {
    return gameModule.findByPk(id, {
      include: [
        { model: genreModule, as: 'genre' },
        { model: authorModule, as: 'author' },
        { model: discountModule, as: 'discount' },
      ],
    });
  }

  create(data) {
    return gameModule.create(data);
  }

  update({
    discountId,
    gameId,
    name,
    price,
    description,
    disk,
    digital,
    authorId,
    genreId,
    count,
    popularity,
    isNew,
    preview,
    image,
    isPreview,
  }) {
    const options = {};
    if (discountId) {
      options.discountId = discountId;
    }
    if (name) {
      options.name = name;
    }
    if (price) {
      options.price = price;
    }
    if (description) {
      options.description = description;
    }
    if (disk) {
      options.disk = disk;
    }
    if (digital) {
      options.digital = digital;
    }
    if (count) {
      options.count = count;
    }
    if (popularity) {
      options.popularity = popularity;
    }
    if (isNew || isNew === false) {
      options.isNew = isNew;
    }
    if (image) {
      options.image = image;
    }
    if (preview) {
      options.preview = preview;
    }
    if (isPreview || isPreview === false) {
      options.isPreview = isPreview;
    }
    if (authorId) {
      options.authorId = authorId;
    }
    if (genreId) {
      options.genreId = genreId;
    }
    return gameModule.update(options, { where: { id: gameId } });
  }

  delete(id) {
    return gameModule.destroy({
      where: {
        id,
      },
    });
  }
}

export default new Game();
