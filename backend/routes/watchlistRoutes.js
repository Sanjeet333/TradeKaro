import express from 'express';
import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from '../controllers/watchlistController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();
router.get('/watchlist', verifyToken, getWatchlist);
router.post('/watchlist/add', verifyToken, addToWatchlist);
router.post('/watchlist/remove', verifyToken, removeFromWatchlist);
export default router;
