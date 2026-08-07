import express from 'express';
import { getAllPositions } from '../controllers/positionsController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();
router.get('/allPositions', verifyToken, getAllPositions);
export default router;
