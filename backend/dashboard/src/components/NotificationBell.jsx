import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import axiosInstance from '../utils/axiosInstance';

const NotificationBell = ({ refreshTrigger }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const loadNotifications = async () => {
    try {
      const res = await axiosInstance.get('/notifications');
      setNotifications(res.data.notifications);
      setUnreadCount(res.data.unreadCount);
    } catch (err) {
      console.error('Failed to load notifications:', err);
    }
  };

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 15000);
    return () => clearInterval(interval);
  }, [refreshTrigger]);

  const handleMarkAllRead = async () => {
    try {
      await axiosInstance.post('/notifications/mark-read', {});
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  return (
    <div className="relative font-body">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative cursor-pointer text-ink/40 hover:text-brand-dark p-1.5 rounded-full hover:bg-brand-pale/60 transition-colors duration-200"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#D85A30] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-brand-light/70 rounded-2xl shadow-[0_10px_30px_-10px_rgba(68,101,146,0.25)] z-50 max-h-80 overflow-y-auto animate-fade-up">
          <div className="flex justify-between items-center px-3.5 py-2.5 border-b border-brand-light/50">
            <span className="text-xs font-heading font-semibold text-brand-dark">
              Notifications
            </span>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-[11px] text-brand-mid hover:text-brand-dark font-medium transition-colors duration-200"
              >
                Mark all read
              </button>
            )}
          </div>
          {notifications.length === 0 ? (
            <p className="text-xs text-ink/40 text-center py-5">
              No notifications
            </p>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                className={`px-3.5 py-2.5 text-xs border-b border-brand-light/40 ${n.isRead ? 'text-ink/40' : 'text-ink/80 bg-brand-pale/30 font-medium'}`}
              >
                {n.message}
                <div className="text-[10px] text-ink/40 mt-0.5">
                  {new Date(n.createdAt).toLocaleString('en-IN')}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
