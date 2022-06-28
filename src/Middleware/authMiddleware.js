import jwt from 'jsonwebtoken';

import AppError from '../Errors/appError.js';

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.cookie.split('=')[1];
    if (!token) {
      next(AppError.unauthorized('Need authorization'));
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    next(AppError.unauthorized('Need authorization'));
  }
};
