import express from 'express';

import { authMiddleware } from '../Middleware/authMiddleware.js';
import { adminMiddleware } from '../Middleware/adminMiddleware.js';
import authorController from '../Controllers/author.js';

const router = new express.Router();

router.get('/', authorController.getAll);
router.get('/:id([0-9]+)', authorController.getById);
router.post('/', authMiddleware, adminMiddleware, authorController.create);
router.put('/:id([0-9]+)', authMiddleware, adminMiddleware, authorController.update);
router.delete('/:id([0-9]+)', authMiddleware, adminMiddleware, authorController.delete);

export default router;
