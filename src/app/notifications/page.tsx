'use client';

import { useState } from 'react';
import { Bell, Check, X, Star, Play, Calendar, Gift, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'new_release',
      title: 'New Movie Released',
      message: 'Spider-Man: No Way Home is now available to stream',
      timestamp: '2 hours ago',
      read: false,
      icon: Play,
      color: 'text-red-500',
    },
    {
      id: 2,
      type: 'recommendation',
      title: 'Recommended for You',
      message: 'Based on your viewing history, you might like "The Batman"',
      timestamp: '5 hours ago',
      read: false,
      icon: Star,
      color: 'text-yellow-500',
    },
    {
      id: 3,
      type: 'subscription',
      title: 'Subscription Update',
      message: 'Your monthly subscription will renew on February 15, 2024',
      timestamp: '1 day ago',
      read: true,
      icon: Calendar,
      color: 'text-blue-500',
    },
    {
      id: 4,
      type: 'promotion',
      title: 'Special Offer',
      message: 'Get 50% off your next month with code SAVE50',
      timestamp: '2 days ago',
      read: true,
      icon: Gift,
      color: 'text-green-500',
    },
    {
      id: 5,
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur tonight from 2-4 AM EST',
      timestamp: '3 days ago',
      read: true,
      icon: AlertCircle,
      color: 'text-orange-500',
    },
    {
      id: 6,
      type: 'new_release',
      title: 'New Series Available',
      message: 'Season 2 of "Stranger Things" is now streaming',
      timestamp: '1 week ago',
      read: true,
      icon: Play,
      color: 'text-red-500',
    },
  ]);

  const filters = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'new_release', label: 'New Releases', count: notifications.filter(n => n.type === 'new_release').length },
    { id: 'recommendation', label: 'Recommendations', count: notifications.filter(n => n.type === 'recommendation').length },
    { id: 'subscription', label: 'Subscription', count: notifications.filter(n => n.type === 'subscription').length },
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notification.read;
    return notification.type === activeFilter;
  });

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getNotificationIcon = (notification: any) => {
    const Icon = notification.icon;
    return <Icon size={20} className={notification.color} />;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Bell size={32} />
                  Notifications
                </h1>
                <p className="text-gray-400 mt-1">Stay updated with the latest from FILMAX</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">
                {notifications.filter(n => !n.read).length} unread
              </span>
              {notifications.some(n => !n.read) && (
                <button
                  onClick={markAllAsRead}
                  className="bg-gray-700 text-white px-4 py-2 btn-rounded hover:bg-gray-600 transition-colors text-sm"
                >
                  Mark All Read
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Filters</h3>
              <div className="space-y-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`w-full flex items-center justify-between py-3 px-4 btn-rounded transition-colors ${
                      activeFilter === filter.id
                        ? 'bg-red-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <span>{filter.label}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activeFilter === filter.id
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell size={64} className="text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No notifications</h3>
                <p className="text-gray-400">
                  {activeFilter === 'unread' 
                    ? "You're all caught up! No unread notifications."
                    : "No notifications found for this filter."
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`bg-gray-900 rounded-lg p-6 border-l-4 ${
                      notification.read 
                        ? 'border-gray-700' 
                        : 'border-red-600'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className={`text-lg font-semibold ${
                              notification.read ? 'text-gray-300' : 'text-white'
                            }`}>
                              {notification.title}
                            </h4>
                            <p className={`mt-1 ${
                              notification.read ? 'text-gray-500' : 'text-gray-300'
                            }`}>
                              {notification.message}
                            </p>
                            <p className="text-gray-500 text-sm mt-2">
                              {notification.timestamp}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-2 text-gray-400 hover:text-white transition-colors"
                                title="Mark as read"
                              >
                                <Check size={16} />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                              title="Delete notification"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
