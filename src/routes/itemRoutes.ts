import express from 'express';
import * as itemController from '../controllers/itemController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authenticate, itemController.createItem);
router.get('/', authenticate, itemController.getItems);
router.get('/:id', authenticate, itemController.getItemById);
router.put('/:id', authenticate, itemController.updateItem);
router.delete('/:id', authenticate, itemController.deleteItem);

export default router;