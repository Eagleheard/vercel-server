import express from 'express';

import { authMiddleware } from '../Middleware/authMiddleware.js';
import { adminMiddleware } from '../Middleware/adminMiddleware.js';
import genreController from '../Controllers/genre.js';

const router = new express.Router();

router.get('/', genreController.getAll);
router.get('/:id([0-9]+)', genreController.getById);
router.post('/', authMiddleware, adminMiddleware, genreController.create);
router.put('/:id([0-9]+)', authMiddleware, adminMiddleware, genreController.update);
router.delete('/:id([0-9]+)', authMiddleware, adminMiddleware, genreController.delete);

export default router;
