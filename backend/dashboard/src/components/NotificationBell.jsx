import React, { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import axiosInstance from '../utils/axiosInstance';

// Notification Dropdown Component - same style on mobile and desktop
const NotificationDropdown = ({
  notifications,
  unreadCount,
  onMarkAllRead,
  onClose,
}) => {
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };

    // Add slight delay to prevent immediate close on toggle click
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      // Same anchored-dropdown style for both mobile and desktop:
      // - positioned absolute, right-aligned to the bell button
      // - width capped to viewport width so it never overflows off-screen
      className="
        absolute right-0 mt-2
        w-72 max-w-[calc(100vw-2rem)]
        max-h-80
        bg-white
        border border-brand-light/70
        rounded-2xl
        shadow-[0_10px_30px_-10px_rgba(68,101,146,0.25)]
        z-50
        overflow-y-auto
        overflow-x-hidden
        custom-scrollbar
        animate-fade-up
      "
    >
      {/* Header - with title and mark all read button */}
      <div className="sticky top-0 bg-white flex justify-between items-center px-3.5 py-2.5 border-b border-brand-light/50 rounded-t-2xl">
        <span className="text-xs font-heading font-semibold text-brand-dark">
          Notifications
        </span>
        {/* Mark all read button - only shows if there are unread notifications */}
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllRead}
            className="text-[11px] text-brand-mid hover:text-brand-dark font-medium transition-colors duration-200 active:scale-95"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Notification List or Empty State */}
      <div>
        {notifications.length === 0 ? (
          // Empty state - shows when no notifications exist
          <p className="text-xs text-ink/40 text-center py-5 font-medium">
            No notifications
          </p>
        ) : (
          // Notification List - maps through notifications with proper styling
          notifications.map((n) => (
            <div
              key={n._id}
              className={`
                px-3.5 py-2.5
                text-xs
                border-b border-brand-light/40
                transition-colors duration-200
                ${
                  n.isRead
                    ? 'text-ink/40' // Read notifications - muted color
                    : 'text-ink/80 bg-brand-pale/30 font-medium' // Unread - highlighted with brand color
                }
              `}
            >
              {/* Notification message content */}
              {n.message}
              {/* Timestamp - formatted in Indian time (en-IN) */}
              <div className="text-[10px] text-ink/40 mt-0.5">
                {new Date(n.createdAt).toLocaleString('en-IN')}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const NotificationBell = ({ refreshTrigger }) => {
  // State Management
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const bellButtonRef = useRef(null);

  // Fetch notifications from backend
  const loadNotifications = async () => {
    try {
      const res = await axiosInstance.get('/notifications');
      setNotifications(res.data.notifications);
      setUnreadCount(res.data.unreadCount);
    } catch (err) {
      console.error('Failed to load notifications:', err);
    }
  };

  // Load notifications on component mount and set up polling interval
  useEffect(() => {
    loadNotifications();

    // Poll for new notifications every 15 seconds
    const interval = setInterval(loadNotifications, 15000);

    return () => clearInterval(interval);
  }, [refreshTrigger]);

  // Mark all notifications as read
  const handleMarkAllRead = async () => {
    try {
      await axiosInstance.post('/notifications/mark-read', {});
      setUnreadCount(0);
      // Update all notifications to isRead: true
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  return (
    <div className="relative font-body">
      {/* Bell Button - with badge for unread count */}
      <button
        ref={bellButtonRef}
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative cursor-pointer text-ink/40 hover:text-brand-dark p-1.5 rounded-full hover:bg-brand-pale/60 transition-colors duration-200 active:scale-95"
      >
        <Bell className="w-4 h-4" />

        {/* Unread notification badge - shows count or 9+ if more than 9 */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#D85A30] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown - renders when showDropdown is true, same style all screen sizes */}
      {showDropdown && (
        <NotificationDropdown
          notifications={notifications}
          unreadCount={unreadCount}
          onMarkAllRead={handleMarkAllRead}
          onClose={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default NotificationBell;
