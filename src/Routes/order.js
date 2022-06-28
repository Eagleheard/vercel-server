import express from 'express';

import { authMiddleware } from '../Middleware/authMiddleware.js';
import { adminMiddleware } from '../Middleware/adminMiddleware.js';
import orderController from '../Controllers/order.js';

const router = new express.Router();

router.post('/', authMiddleware, orderController.create);
router.get('/user', authMiddleware, orderController.userGetAll);
router.get('/admin', authMiddleware, adminMiddleware, orderController.adminGetAll);

export default router;
