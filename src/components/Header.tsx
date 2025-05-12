
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Header: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  
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
    default:
      title = "";
  }

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md px-5 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
    </header>
  );
};

export default Header;
