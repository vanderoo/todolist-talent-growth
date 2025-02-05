import express from 'express';
import * as itemController from '../controllers/itemController';
import { authenticate } from '../middlewares/authMiddleware';
import { validateObjectId } from '../middlewares/validateObjectId';

const router = express.Router();

router.post('/', authenticate, itemController.createItem);
router.get('/', authenticate, itemController.getItems);
router.get('/:id', authenticate, validateObjectId, itemController.getItemById);
router.put('/:id', authenticate, validateObjectId, itemController.updateItem);
router.delete('/:id', authenticate, validateObjectId, itemController.deleteItem);

export default router;