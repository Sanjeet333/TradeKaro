import Notification from '../model/NotificationModel.js';

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.userID })
      .sort({ createdAt: -1 })
      .limit(15);
    const unreadCount = await Notification.countDocuments({
      userId: req.userID,
      isRead: false,
    });
    res.json({ notifications, unreadCount });
  } catch (err) {
    console.error('Notification fetch error', err);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.body;
    if (notificationId) {
      await Notification.updateOne(
        { _id: notificationId, userId: req.userID },
        { isRead: true }
      );
    } else {
      await Notification.updateMany(
        { userId: req.userID, isRead: false },
        { isRead: true }
      );
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Mark read error:', err);
    res.status(500).json({ error: 'Failed to mark as read' });
  }
};
