
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import CardCustomizer from '@/components/vendor/CardCustomizer';
import AnalyticsDashboard from '@/components/vendor/AnalyticsDashboard';
import { motion } from 'framer-motion';

interface VendorDashboardProps {
  onLogout?: () => void;
}

const VendorDashboard = ({ onLogout }: VendorDashboardProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analytics' | 'customize'>('dashboard');
  
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sf-pro">
      <motion.div 
        className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 sticky top-0 z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="96" height="96" rx="24" fill="#2D5F63"/>
                <path d="M24 36H72V32C72 28 68 24 64 24H32C28 24 24 28 24 32V36Z" fill="#C2F4E5"/>
                <path d="M24 36H72V64C72 68 68 72 64 72H32C28 72 24 68 24 64V36Z" fill="#C2F4E5"/>
                <path d="M53 58C55.2091 58 57 56.2091 57 54C57 51.7909 55.2091 50 53 50C50.7909 50 49 51.7909 49 54C49 56.2091 50.7909 58 53 58Z" fill="#2D5F63"/>
                <path d="M47 58L43 54L47 50" fill="#2D5F63"/>
                <path d="M59 50L63 54L59 58" fill="#2D5F63"/>
              </svg>
            </div>
            <h1 className="text-xl font-semibold">LoyalT Business</h1>
          </div>
          <Button 
            variant="ghost" 
            className="text-gray-700 hover:bg-gray-100 hover:text-black"
            onClick={handleLogout}
          >
            Sign Out
          </Button>
        </div>
      </motion.div>
      
      <motion.div 
        className="container mx-auto py-6 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Tab Navigation - Apple-like design */}
        <div className="flex overflow-x-auto hide-scrollbar mb-8 bg-white rounded-full p-1 shadow-sm">
          <motion.button
            className={`py-2 px-6 rounded-full font-medium text-sm transition-all ${
              activeTab === 'dashboard' 
                ? 'bg-[#2D5F63] text-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('dashboard')}
            whileHover={{ scale: activeTab !== 'dashboard' ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
          >
            Overview
          </motion.button>
          <motion.button
            className={`py-2 px-6 rounded-full font-medium text-sm transition-all ${
              activeTab === 'analytics' 
                ? 'bg-[#2D5F63] text-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('analytics')}
            whileHover={{ scale: activeTab !== 'analytics' ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
          >
            Analytics
          </motion.button>
          <motion.button
            className={`py-2 px-6 rounded-full font-medium text-sm transition-all ${
              activeTab === 'customize' 
                ? 'bg-[#2D5F63] text-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('customize')}
            whileHover={{ scale: activeTab !== 'customize' ? 1.05 : 1 }}
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
              className="bg-white rounded-xl shadow-sm p-6 mb-6"
              whileHover={{ y: -3, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.08)" }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Welcome Back</h2>
              <p className="text-gray-600 mb-6">Here's an overview of your loyalty program performance.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  className="bg-[#F8F8FA] p-6 rounded-lg border border-gray-100"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-sm font-medium text-gray-500 mb-2">ACTIVE MEMBERS</h3>
                  <p className="text-3xl font-bold text-[#2D5F63]">243</p>
                  <p className="text-sm text-green-600 mt-2">↑ 12% from last month</p>
                </motion.div>
                
                <motion.div 
                  className="bg-[#F8F8FA] p-6 rounded-lg border border-gray-100"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-sm font-medium text-gray-500 mb-2">REDEMPTIONS</h3>
                  <p className="text-3xl font-bold text-[#2D5F63]">56</p>
                  <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
                </motion.div>
                
                <motion.div 
                  className="bg-[#F8F8FA] p-6 rounded-lg border border-gray-100"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-sm font-medium text-gray-500 mb-2">NEW CUSTOMERS</h3>
                  <p className="text-3xl font-bold text-[#2D5F63]">18</p>
                  <p className="text-sm text-green-600 mt-2">↑ 5% this week</p>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl shadow-sm p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-4">Loyalty Programs</h2>
              <div className="space-y-3">
                <motion.div 
                  className="flex justify-between items-center p-4 bg-[#F8F8FA] rounded-lg"
                  whileHover={{ scale: 1.02, backgroundColor: "#f2f2f7" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div>
                    <h3 className="font-medium">Coffee Rewards</h3>
                    <p className="text-sm text-gray-500">Buy 9, get 1 free</p>
                  </div>
                  <Button size="sm" className="bg-[#2D5F63] text-white hover:bg-opacity-90" variant="default">Edit</Button>
                </motion.div>
                
                <motion.div 
                  className="flex justify-between items-center p-4 bg-[#F8F8FA] rounded-lg"
                  whileHover={{ scale: 1.02, backgroundColor: "#f2f2f7" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div>
                    <h3 className="font-medium">VIP Discount</h3>
                    <p className="text-sm text-gray-500">10% off for Gold members</p>
                  </div>
                  <Button size="sm" className="bg-[#2D5F63] text-white hover:bg-opacity-90" variant="default">Edit</Button>
                </motion.div>
                
                <motion.div 
                  className="flex justify-between items-center p-4 bg-[#F8F8FA] rounded-lg"
                  whileHover={{ scale: 1.02, backgroundColor: "#f2f2f7" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div>
                    <h3 className="font-medium">Birthday Special</h3>
                    <p className="text-sm text-gray-500">Free dessert on customer's birthday</p>
                  </div>
                  <Button size="sm" className="bg-[#2D5F63] text-white hover:bg-opacity-90" variant="default">Edit</Button>
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-6"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button className="bg-[#2D5F63] hover:bg-opacity-90 text-white">
                  + Add New Program
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <AnalyticsDashboard />
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
