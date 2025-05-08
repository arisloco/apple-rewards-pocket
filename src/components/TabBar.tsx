
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Ticket, Scan, MapPin, User } from 'lucide-react';

const TabBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 bg-white/80 backdrop-blur-md border-t border-gray-200 px-2 pb-2 pt-1 shadow-lg">
      <div className="flex justify-around items-center">
        <NavLink 
          to="/" 
          className={({ isActive }) => `apple-tab ${isActive ? 'text-loyalt-primary' : 'text-gray-500'}`}
          end
        >
          <Home className="h-6 w-6" strokeWidth={1.5} />
          <span>Home</span>
        </NavLink>
        
        <NavLink 
          to="/shops" 
          className={({ isActive }) => `apple-tab ${isActive ? 'text-loyalt-primary' : 'text-gray-500'}`}
        >
          <MapPin className="h-6 w-6" strokeWidth={1.5} />
          <span>Maps</span>
        </NavLink>
        
        <NavLink 
          to="/scan" 
          className={({ isActive }) => `apple-tab ${isActive ? 'text-loyalt-primary' : 'text-gray-500'}`}
        >
          <div className="bg-loyalt-primary rounded-full p-2 -mt-5 border-4 border-white shadow-md">
            <Scan className="h-6 w-6 text-white" strokeWidth={1.5} />
          </div>
          <span className="mt-1">Scan</span>
        </NavLink>
        
        <NavLink 
          to="/rewards" 
          className={({ isActive }) => `apple-tab ${isActive ? 'text-loyalt-primary' : 'text-gray-500'}`}
        >
          <Ticket className="h-6 w-6" strokeWidth={1.5} />
          <span>Rewards</span>
        </NavLink>
        
        <NavLink 
          to="/profile" 
          className={({ isActive }) => `apple-tab ${isActive ? 'text-loyalt-primary' : 'text-gray-500'}`}
        >
          <User className="h-6 w-6" strokeWidth={1.5} />
          <span>Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default TabBar;
