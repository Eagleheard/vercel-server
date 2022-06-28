import { Comment as commentsModule } from '../Comments/index.js';
import userModule from '../User/index.js';

class Comments {
  getAll({ gameId, dataLimit, currentPage }) {
    const offset = (currentPage - 1) * dataLimit;
    return commentsModule.findAndCountAll({
      limit: dataLimit,
      offset,
      order: [['id', 'DESC']],
      where: {
        gameId,
      },
      include: [
        {
          model: userModule,
          attributes: ['id', 'name', 'photo', 'lastName'],
        },
      ],
    });
  }

  create(data) {
    return commentsModule.create({ ...data });
  }
}

export default new Comments();
