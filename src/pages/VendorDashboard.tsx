
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import CardCustomizer from '@/components/vendor/CardCustomizer';
import { motion } from 'framer-motion';

interface VendorDashboardProps {
  onLogout?: () => void;
}

const VendorDashboard = ({ onLogout }: VendorDashboardProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'customize'>('dashboard');
  
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      <motion.div 
        className="bg-loyalt-primary text-white p-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">LoyalT Business</h1>
          <Button 
            variant="outline" 
            className="bg-transparent border-white text-white hover:bg-white hover:text-loyalt-primary"
            onClick={handleLogout}
          >
            Sign Out
          </Button>
        </div>
      </motion.div>
      
      <motion.div 
        className="container mx-auto p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <motion.button
            className={`py-3 px-6 font-medium text-base ${
              activeTab === 'dashboard' 
                ? 'text-loyalt-primary border-b-2 border-loyalt-primary' 
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('dashboard')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Dashboard
          </motion.button>
          <motion.button
            className={`py-3 px-6 font-medium text-base ${
              activeTab === 'customize' 
                ? 'text-loyalt-primary border-b-2 border-loyalt-primary' 
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('customize')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Customize Card
          </motion.button>
        </div>
        
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6 mb-6"
              whileHover={{ y: -5, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Vendor Dashboard</h2>
              <p className="text-gray-600 mb-4">Welcome to your business portal. Here you can manage your loyalty programs and track customer engagement.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <motion.div 
                  className="bg-gray-50 p-6 rounded-lg border border-gray-100"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-xl font-medium mb-2">Active Loyalty Cards</h3>
                  <p className="text-3xl font-bold text-loyalt-primary">243</p>
                  <p className="text-sm text-gray-500 mt-2">+12% from last month</p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-50 p-6 rounded-lg border border-gray-100"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-xl font-medium mb-2">Reward Redemptions</h3>
                  <p className="text-3xl font-bold text-loyalt-primary">56</p>
                  <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-50 p-6 rounded-lg border border-gray-100"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-xl font-medium mb-2">New Customers</h3>
                  <p className="text-3xl font-bold text-loyalt-primary">18</p>
                  <p className="text-sm text-gray-500 mt-2">This week</p>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Loyalty Program Settings</h2>
              <div className="space-y-4">
                <motion.div 
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                  whileHover={{ scale: 1.02, backgroundColor: "#f9f9f9" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div>
                    <h3 className="font-medium">Coffee Rewards</h3>
                    <p className="text-sm text-gray-500">Buy 9, get 1 free</p>
                  </div>
                  <Button size="sm">Edit</Button>
                </motion.div>
                
                <motion.div 
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                  whileHover={{ scale: 1.02, backgroundColor: "#f9f9f9" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div>
                    <h3 className="font-medium">VIP Discount</h3>
                    <p className="text-sm text-gray-500">10% off for Gold members</p>
                  </div>
                  <Button size="sm">Edit</Button>
                </motion.div>
                
                <motion.div 
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                  whileHover={{ scale: 1.02, backgroundColor: "#f9f9f9" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div>
                    <h3 className="font-medium">Birthday Special</h3>
                    <p className="text-sm text-gray-500">Free dessert on customer's birthday</p>
                  </div>
                  <Button size="sm">Edit</Button>
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-6"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button className="bg-loyalt-primary hover:bg-opacity-90">
                  + Add New Reward Program
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
        
        {activeTab === 'customize' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <CardCustomizer />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default VendorDashboard;
