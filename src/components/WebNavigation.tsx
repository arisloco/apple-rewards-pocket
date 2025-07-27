import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Ticket, Scan, MapPin, User } from 'lucide-react';

const WebNavigation = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-loyalt-primary">LoyalT</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-loyalt-primary bg-loyalt-primary/10' 
                    : 'text-gray-600 hover:text-loyalt-primary hover:bg-gray-50'
                }`
              }
              end
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </NavLink>
            
            <NavLink 
              to="/shops" 
              className={({ isActive }) => 
                `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-loyalt-primary bg-loyalt-primary/10' 
                    : 'text-gray-600 hover:text-loyalt-primary hover:bg-gray-50'
                }`
              }
            >
              <MapPin className="h-5 w-5" />
              <span>Shops</span>
            </NavLink>
            
            <NavLink 
              to="/scan" 
              className={({ isActive }) => 
                `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-loyalt-primary bg-loyalt-primary/10' 
                    : 'text-gray-600 hover:text-loyalt-primary hover:bg-gray-50'
                }`
              }
            >
              <Scan className="h-5 w-5" />
              <span>Scan</span>
            </NavLink>
            
            <NavLink 
              to="/rewards" 
              className={({ isActive }) => 
                `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-loyalt-primary bg-loyalt-primary/10' 
                    : 'text-gray-600 hover:text-loyalt-primary hover:bg-gray-50'
                }`
              }
            >
              <Ticket className="h-5 w-5" />
              <span>Rewards</span>
            </NavLink>
            
            <NavLink 
              to="/profile" 
              className={({ isActive }) => 
                `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-loyalt-primary bg-loyalt-primary/10' 
                    : 'text-gray-600 hover:text-loyalt-primary hover:bg-gray-50'
                }`
              }
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default WebNavigation;