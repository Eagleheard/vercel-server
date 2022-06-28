import appError from '../Errors/appError.js';

import commentsModule from '../Models/Comments/comments.js';

class Comments {
  async create(req, res, next) {
    try {
      const user = req.user;
      const comment = await commentsModule.create({
        userId: user.id,
        gameId: req.params.id,
        comment: req.body.comment,
      });
      res.status(201).json(comment);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async getAllByGame({ params, query: { limit, page } }, res, next) {
    try {
      const dataLimit = limit && /[0-9]+/.test(limit) && parseInt(limit) ? parseInt(limit) : null;
      const currentPage = page && /[0-9]+/.test(page) && parseInt(page) ? parseInt(page) : 1;
      const comments = await commentsModule.getAll({ gameId: params.id, dataLimit, currentPage });
      res.status(200).json(comments);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }
}

export default new Comments();
