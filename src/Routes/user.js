import express from 'express';

import { authMiddleware } from '../Middleware/authMiddleware.js';
import { adminMiddleware } from '../Middleware/adminMiddleware.js';
import userController from '../Controllers/user.js';

const router = new express.Router();

router.put('/signup', userController.signup);
router.put('/login', userController.login);

router.put('/logout', authMiddleware, userController.logout);
router.get('/auth', authMiddleware, userController.check);
router.get('/', authMiddleware, adminMiddleware, userController.getAll);
router.get('/:id([0-9]+)', authMiddleware, userController.getById);
router.post('/', authMiddleware, adminMiddleware, userController.create);
router.put('/:id([0-9]+)', authMiddleware, userController.update);
router.put('/block/:id([0-9]+)', authMiddleware, adminMiddleware, userController.block);
router.delete('/:id([0-9]+)', authMiddleware, adminMiddleware, userController.delete);

export default router;
