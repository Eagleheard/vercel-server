import express from 'express';

import { authMiddleware } from '../Middleware/authMiddleware.js';
import BasketController from '../Controllers/basket.js';

const router = new express.Router();

router.get('/', authMiddleware, BasketController.getCart);
router.post('/', authMiddleware, BasketController.addGameToCart);
router.put('/increment', authMiddleware, BasketController.incrementGameToCart);
router.put('/decrement', authMiddleware, BasketController.decrementGameFromCart);
router.delete('/:gameId([0-9]+)', authMiddleware, BasketController.removeGameFromCart);
router.delete('/', authMiddleware, BasketController.removeAllGamesFromCart);

export default router;
