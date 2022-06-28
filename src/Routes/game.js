import express from 'express';

import { authMiddleware } from '../Middleware/authMiddleware.js';
import { adminMiddleware } from '../Middleware/adminMiddleware.js';
import gameController from '../Controllers/game.js';

const router = new express.Router();

router.get('/', gameController.getAll);
router.get('/:id([0-9]+)', gameController.getById);
router.post('/', authMiddleware, adminMiddleware, gameController.create);
router.put('/:id([0-9]+)', authMiddleware, adminMiddleware, gameController.update);
router.delete('/:id([0-9]+)', authMiddleware, adminMiddleware, gameController.delete);

export default router;
