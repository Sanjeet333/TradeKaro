import express from 'express';
import {
  getStockList,
  getStockQuotes,
} from '../controllers/stocksController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();
router.get('/stocks/list', verifyToken, getStockList);
router.post('/stocks/quotes', verifyToken, getStockQuotes);
export default router;
