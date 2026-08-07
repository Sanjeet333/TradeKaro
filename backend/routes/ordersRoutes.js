import express from 'express';
import {
  getAllOrders,
  placeNewOrder,
} from '../controllers/ordersController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();
router.get('/allOrders', verifyToken, getAllOrders);
router.post('/newOrder', verifyToken, placeNewOrder);
export default router;
