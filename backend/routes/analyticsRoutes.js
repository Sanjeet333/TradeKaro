import express from 'express';
import {
  getSummary,
  getMonthlyTrend,
} from '../controllers/analyticsController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();
router.get('/analytics/summary', verifyToken, getSummary);
router.get('/analytics/monthly', verifyToken, getMonthlyTrend);
export default router;
