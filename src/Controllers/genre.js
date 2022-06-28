import genreModule from '../Models/Genre/genre.js';
import appError from '../Errors/appError.js';

class Genre {
  async getAll(req, res, next) {
    try {
      const genre = await genreModule.getAll();
      if (!genre) {
        next(appError.notFound('Genres does not exist'));
      }
      res.status(200).json(genre);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async getById(req, res, next) {
    try {
      if (!req.params.id) {
        next(appError.badRequest('Id was not set'));
      }
      const genre = await genreModule.getById(req.params.id);
      if (!genre) {
        next(appError.notFound('Selected genre does not exist'));
      }
      res.status(200).json(genre);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const genre = await genreModule.create(req.body);
      res.status(201).json(genre);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async update(req, res, next) {
    try {
      if (!req.params.id) {
        next(appError.badRequest('Id was not set'));
      }
      const genre = await genreModule.update(req.params.id, req.body);
      if (!genre) {
        next(appError.notFound('Selected genre does not exist'));
      }
      res.status(200).json(genre);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) {
        next(appError.badRequest('Id was not set'));
      }
      const genre = await genreModule.delete(req.params.id);
      if (!genre) {
        next(appError.notFound('Selected genre does not exist'));
      }
      res.status(200).json(genre);
    } catch (e) {
      next(appError.internalServerError(e.message));
    }
  }
}

export default new Genre();
