import express from 'express';
import { getAllHoldings } from '../controllers/holdingsController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();
router.get('/allHoldings', verifyToken, getAllHoldings);
export default router;
