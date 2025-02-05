import express from 'express';
import * as authController from '../controllers/authController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authenticate, authController.getProfile);

export default router;