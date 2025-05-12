
import React from 'react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import { 
  User, Settings, CreditCard, Gift, Bell, HelpCircle, LogOut,
  ChevronRight, Shield, Share2, Star, Award, Lock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 10, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const handleLogout = () => {
    logout();
  };

  const settingsGroups = [
    {
      title: "Account",
      items: [
        { icon: <User size={20} />, label: "Personal Information" },
        { icon: <CreditCard size={20} />, label: "Payment Methods" },
        { icon: <Gift size={20} />, label: "Refer a Friend" },
        { icon: <Shield size={20} />, label: "Privacy Settings" }
      ]
    },
    {
      title: "App Settings",
      items: [
        { icon: <Bell size={20} />, label: "Notification Preferences" },
        { icon: <Settings size={20} />, label: "App Settings" },
        { icon: <HelpCircle size={20} />, label: "Help & Support" },
        { icon: <Share2 size={20} />, label: "Share the App" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-apple-light-gray pb-20">
      <Header />
      
      <main className="apple-container">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="premium-card p-6 mb-6 rounded-2xl"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center">
            <div className="mr-4">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-loyalt-gradient-start to-loyalt-gradient-end flex items-center justify-center text-white text-3xl font-semibold">
                {user?.name.charAt(0) || 'U'}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user?.name || 'User'}</h2>
              <p className="text-gray-500 text-sm">{user?.email || 'user@example.com'}</p>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400 mr-1" />
                <span className="text-sm font-medium">{user?.membershipLevel === 'gold' ? 'Gold' : 'Standard'} Member</span>
              </div>
            </div>
            <button className="bg-loyalt-primary/10 rounded-full p-2">
              <Settings className="h-5 w-5 text-loyalt-primary" />
            </button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-2xl font-bold">{user?.points || 0}</p>
                <p className="text-xs text-gray-500">Points</p>
              </div>
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-xs text-gray-500">Redeemed</p>
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-gray-500">Shops</p>
              </div>
            </div>
          </div>
          
          <motion.button 
            className="w-full mt-5 bg-loyalt-primary text-white rounded-full py-2.5 text-sm font-medium flex items-center justify-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Award className="h-4 w-4 mr-2" />
            View Membership Benefits
          </motion.button>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          animate="show"
          variants={container}
          className="space-y-6"
        >
          <div>
            <motion.div 
              className="premium-card p-4 rounded-2xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-loyalt-primary/10 flex items-center justify-center mr-3">
                    <Lock className="h-5 w-5 text-loyalt-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Exclusive Offers</h3>
                    <p className="text-xs text-gray-500">3 new rewards available</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </motion.div>
          </div>
          
          {settingsGroups.map((group, idx) => (
            <motion.div key={group.title} variants={item} className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500 ml-1">{group.title}</h3>
              <div className="premium-card rounded-2xl overflow-hidden">
                {group.items.map((item, index) => (
                  <React.Fragment key={item.label}>
                    <motion.div 
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                      whileHover={{ backgroundColor: 'rgba(0,0,0,0.03)' }}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          {item.icon}
                        </div>
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </motion.div>
                    {index < group.items.length - 1 && <div className="h-px bg-gray-100 mx-4" />}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          ))}
          
          <motion.div variants={item}>
            <motion.div 
              className="premium-card p-4 rounded-2xl mt-4"
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,240,240,0.5)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
            >
              <div className="flex items-center text-red-500">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center mr-3">
                  <LogOut className="h-5 w-5 text-red-500" />
                </div>
                <span>Log Out</span>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div variants={item} className="pt-3">
            <p className="text-center text-xs text-gray-500">
              LoyalT v1.0.0 • Terms of Service • Privacy Policy
            </p>
          </motion.div>
        </motion.div>
      </main>

      <TabBar />
    </div>
  );
};

export default ProfilePage;
