
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, Settings, Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'reward' | 'points';
  timestamp: Date;
  read: boolean;
}

const Header: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Get title based on current route
  let title = "";
  switch (location.pathname) {
    case "/":
      title = `Hi, ${user?.name?.split(' ')[0] || 'User'}`;
      break;
    case "/rewards":
      title = "Rewards";
      break;
    case "/shops":
      title = "Maps";
      break;
    case "/scan":
      title = "Scan";
      break;
    case "/profile":
      title = "Profile";
      break;
    case "/vendor/dashboard":
      title = "Dashboard";
      break;
    case "/login":
      title = "Login";
      break;
    default:
      // Extract last part of path for dynamic routes
      const pathSegments = location.pathname.split('/').filter(Boolean);
      title = pathSegments.length > 0 
        ? pathSegments[pathSegments.length - 1].charAt(0).toUpperCase() + 
          pathSegments[pathSegments.length - 1].slice(1)
        : "";
  }

  // Demo notifications
  useEffect(() => {
    if (user) {
      // Load notifications from localStorage or initialize with demo data
      const savedNotifications = localStorage.getItem('notifications');
      
      if (savedNotifications) {
        try {
          const parsedNotifications = JSON.parse(savedNotifications).map((n: any) => ({
            ...n,
            timestamp: new Date(n.timestamp)
          }));
          setNotifications(parsedNotifications);
          setUnreadCount(parsedNotifications.filter((n: Notification) => !n.read).length);
        } catch (error) {
          console.error('Error parsing notifications:', error);
          initDemoNotifications();
        }
      } else {
        initDemoNotifications();
      }
    }
  }, [user]);
  
  // Save notifications to localStorage when they change
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem('notifications', JSON.stringify(notifications));
      setUnreadCount(notifications.filter(n => !n.read).length);
    }
  }, [notifications]);
  
  const initDemoNotifications = () => {
    const demoNotifications: Notification[] = [
      {
        id: 'notif-1',
        title: 'Welcome to LoyalT!',
        message: 'Start earning rewards by visiting your favorite shops.',
        type: 'info',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        read: false
      },
      {
        id: 'notif-2',
        title: 'Points Added',
        message: 'You earned 10 points from Urban Brew.',
        type: 'points',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false
      },
      {
        id: 'notif-3',
        title: 'New Reward Available',
        message: 'Free coffee reward is now available at Urban Brew.',
        type: 'reward',
        timestamp: new Date(),
        read: false
      }
    ];
    
    setNotifications(demoNotifications);
    setUnreadCount(demoNotifications.length);
  };
  
  const markAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };
  
  const removeNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };
  
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md px-5 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        
        {/* Header actions based on route */}
        <div className="flex items-center space-x-2">
          {/* Notifications Bell */}
          {user && (
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-500 relative"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="px-4 py-3 border-b flex items-center justify-between">
                  <h3 className="font-semibold">Notifications</h3>
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      className="text-xs h-auto py-1"
                      onClick={markAllAsRead}
                    >
                      Mark all as read
                    </Button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <AnimatePresence>
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          className={`p-3 border-b last:border-b-0 relative ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex">
                            <div className={`w-2 self-stretch rounded-full mr-3 ${
                              notification.type === 'info' ? 'bg-blue-400' :
                              notification.type === 'reward' ? 'bg-purple-400' :
                              'bg-green-400'
                            }`} />
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <h4 className="font-medium text-sm">{notification.title}</h4>
                                <button 
                                  className="text-gray-400 hover:text-gray-600"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeNotification(notification.id);
                                  }}
                                >
                                  <X size={16} />
                                </button>
                              </div>
                              <p className="text-sm text-gray-600">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-1">{formatTimestamp(notification.timestamp)}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        No notifications
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </PopoverContent>
            </Popover>
          )}
          
          {location.pathname === "/profile" && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={logout}
              className="text-gray-500 hover:text-red-500"
              aria-label="Logout"
              title="Logout"
            >
              <LogOut size={20} />
            </Button>
          )}
          
          {location.pathname === "/vendor/dashboard" && (
            <Button 
              variant="ghost" 
              size="icon"
              className="text-gray-500"
              aria-label="Settings"
            >
              <Settings size={20} />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
