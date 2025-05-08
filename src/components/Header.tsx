
import React from 'react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ userName = "Emma" }) => {
  const location = useLocation();
  let title = "";
  
  switch (location.pathname) {
    case "/":
      title = `Hi, ${userName}`;
      break;
    case "/rewards":
      title = "Rewards";
      break;
    case "/shops":
      title = "Shops";
      break;
    case "/profile":
      title = "Profile";
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
