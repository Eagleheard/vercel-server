import express from 'express';

import { authMiddleware } from '../Middleware/authMiddleware.js';
import { adminMiddleware } from '../Middleware/adminMiddleware.js';
import discountController from '../Controllers/discount.js';

const router = new express.Router();

router.post('/', authMiddleware, adminMiddleware, discountController.create);
router.get('/', authMiddleware, discountController.getAll);
router.delete('/:id([0-9]+)', authMiddleware, adminMiddleware, discountController.delete);
router.delete('/', authMiddleware, adminMiddleware, discountController.deleteAll);

export default router;
