import express from 'express';
import {
  getNotifications,
  markAsRead,
} from '../controllers/notificationsController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();
router.get('/notifications', verifyToken, getNotifications);
router.post('/notifications/mark-read', verifyToken, markAsRead);
export default router;
