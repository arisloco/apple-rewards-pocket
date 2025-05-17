
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  let title = "";
  
  // Determine header title based on current route
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

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md px-5 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        
        {/* Add header actions based on route */}
        <div className="flex items-center space-x-2">
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
