import express from 'express';

import { authMiddleware } from '../Middleware/authMiddleware.js';
import achievementController from '../Controllers/achievement.js';

const router = new express.Router();

router.get('/', authMiddleware, achievementController.getAll);

export default router;
