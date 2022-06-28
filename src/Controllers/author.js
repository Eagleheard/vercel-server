import authorModule from '../Models/Author/author.js';
import appError from '../Errors/appError.js';

class Author {
  async getAll(req, res, next) {
    try {
      const author = await authorModule.getAll();
      if (!author) {
        next(appError.notFound('Authors does not exists'));
      }
      res.status(200).json(author);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async getById(req, res, next) {
    try {
      if (!req.params.id) {
        next(appError.badRequest('Id was not set'));
      }
      const author = await authorModule.getById(req.params.id);
      if (!author) {
        next(appError.notFound('Selected author does not exist'));
      }
      res.status(200).json(author);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const author = await authorModule.create({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        popularity: req.body.popularity,
        location: req.body.location,
      });
      res.status(201).json(author);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async update(req, res, next) {
    try {
      if (!req.params.id) {
        next(appError.badRequest('Id was not set'));
      }
      await authorModule.update({ authorId: req.params.id, ...req.body });
      const author = await authorModule.getById(req.params.id);
      if (!author) {
        next(appError.notFound('Selected author does not exist'));
      }
      res.status(200).json(author);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) {
        next(appError.badRequest('Id was not set'));
      }
      const author = await authorModule.delete(req.params.id);
      if (!author) {
        next(appError.notFound('Selected author does not exist'));
      }
      res.status(200).json(author);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }
}

export default new Author();
