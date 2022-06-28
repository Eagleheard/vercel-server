import AppError from '../Errors/appError.js';

export const adminMiddleware = (req, res, next) => {
  try {
    if (req.user.role === 'USER') {
      next(AppError.forbidden('You dont have permission for this'));
    }
    next();
  } catch (e) {
    next(AppError.internalServerError(e.message));
  }
};
