
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const VendorDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-loyalt-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">LoyalT Business</h1>
          <Button 
            variant="outline" 
            className="bg-transparent border-white text-white hover:bg-white hover:text-loyalt-primary"
            onClick={() => navigate('/login')}
          >
            Sign Out
          </Button>
        </div>
      </div>
      
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Vendor Dashboard</h2>
          <p className="text-gray-600 mb-4">Welcome to your business portal. Here you can manage your loyalty programs and track customer engagement.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="text-xl font-medium mb-2">Active Loyalty Cards</h3>
              <p className="text-3xl font-bold text-loyalt-primary">243</p>
              <p className="text-sm text-gray-500 mt-2">+12% from last month</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="text-xl font-medium mb-2">Reward Redemptions</h3>
              <p className="text-3xl font-bold text-loyalt-primary">56</p>
              <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="text-xl font-medium mb-2">New Customers</h3>
              <p className="text-3xl font-bold text-loyalt-primary">18</p>
              <p className="text-sm text-gray-500 mt-2">This week</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Loyalty Program Settings</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Coffee Rewards</h3>
                <p className="text-sm text-gray-500">Buy 9, get 1 free</p>
              </div>
              <Button size="sm">Edit</Button>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">VIP Discount</h3>
                <p className="text-sm text-gray-500">10% off for Gold members</p>
              </div>
              <Button size="sm">Edit</Button>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Birthday Special</h3>
                <p className="text-sm text-gray-500">Free dessert on customer's birthday</p>
              </div>
              <Button size="sm">Edit</Button>
            </div>
          </div>
          
          <div className="mt-6">
            <Button className="bg-loyalt-primary hover:bg-opacity-90">
              + Add New Reward Program
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
