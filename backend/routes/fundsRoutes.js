import express from 'express';
import { getFunds } from '../controllers/fundsController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();
router.get('/funds', verifyToken, getFunds);
export default router;
