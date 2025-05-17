
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import CardCustomizer from '@/components/vendor/CardCustomizer';
import AnalyticsDashboard from '@/components/vendor/AnalyticsDashboard';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import QRCode from '@/components/QRCode';
import { Download, Plus, Users, Award, Calendar } from 'lucide-react';

interface VendorDashboardProps {
  onLogout?: () => void;
}

interface VendorData {
  activeMembers: number;
  redemptions: number;
  newCustomers: number;
  programs: Array<{
    id: string;
    name: string;
    description: string;
  }>;
}

const VendorDashboard = ({ onLogout }: VendorDashboardProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analytics' | 'customize'>('dashboard');
  const [vendorData, setVendorData] = useState<VendorData>({
    activeMembers: 0,
    redemptions: 0,
    newCustomers: 0,
    programs: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [qrValue, setQrValue] = useState('');
  const [qrPoints, setQrPoints] = useState('10');
  
  useEffect(() => {
    const fetchVendorData = async () => {
      setIsLoading(true);
      
      try {
        if (supabase && user) {
          // Get shop data for this vendor
          const { data: shopData } = await supabase
            .from('shops')
            .select('*')
            .eq('owner_id', user.id)
            .single();
            
          if (shopData) {
            // Get analytics data
            const { data: membersData } = await supabase
              .from('transactions')
              .select('user_id')
              .eq('shop_id', shopData.id)
              .order('created_at', { ascending: false });
              
            // Count unique users
            const uniqueUsers = new Set(membersData?.map(m => m.user_id));
            
            // Get recent redemptions
            const { data: redemptionsData } = await supabase
              .from('user_rewards')
              .select('*')
              .eq('shop_id', shopData.id)
              .eq('redeemed', true);
              
            // Get new customers in the last 30 days
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            
            const { data: newCustomersData } = await supabase
              .from('transactions')
              .select('user_id')
              .eq('shop_id', shopData.id)
              .gt('created_at', thirtyDaysAgo.toISOString());
              
            const newCustomers = new Set(newCustomersData?.map(c => c.user_id));
            
            // Get loyalty programs
            const { data: programsData } = await supabase
              .from('loyalty_programs')
              .select('*')
              .eq('shop_id', shopData.id);
              
            setVendorData({
              activeMembers: uniqueUsers.size,
              redemptions: redemptionsData?.length || 0,
              newCustomers: newCustomers.size,
              programs: programsData?.map(p => ({
                id: p.id,
                name: p.name,
                description: p.description
              })) || []
            });
            
            // Generate a QR code value
            setQrValue(`points:${shopData.id}:10:qr-${Date.now()}`);
          }
        } else {
          // Use demo data
          setVendorData({
            activeMembers: 243,
            redemptions: 56,
            newCustomers: 18,
            programs: [
              {
                id: 'prog-1',
                name: 'Coffee Rewards',
                description: 'Buy 9, get 1 free'
              },
              {
                id: 'prog-2',
                name: 'VIP Discount',
                description: '10% off for Gold members'
              },
              {
                id: 'prog-3',
                name: 'Birthday Special',
                description: 'Free dessert on customer\'s birthday'
              }
            ]
          });
          
          // Generate demo QR code
          setQrValue('points:shop-1:10:qr-demo');
        }
      } catch (error) {
        console.error('Error fetching vendor data:', error);
        toast.error('Failed to load dashboard data');
        
        // Use demo data as fallback
        setVendorData({
          activeMembers: 243,
          redemptions: 56,
          newCustomers: 18,
          programs: [
            {
              id: 'prog-1',
              name: 'Coffee Rewards',
              description: 'Buy 9, get 1 free'
            },
            {
              id: 'prog-2',
              name: 'VIP Discount',
              description: '10% off for Gold members'
            },
            {
              id: 'prog-3',
              name: 'Birthday Special',
              description: 'Free dessert on customer\'s birthday'
            }
          ]
        });
        
        // Generate demo QR code
        setQrValue('points:shop-1:10:qr-demo');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchVendorData();
  }, [user]);
  
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      logout();
    }
  };
  
  const handleCreateQR = () => {
    // Generate a new QR code with the specified points
    const shopId = user ? user.id : 'shop-1';
    const qrId = `qr-${Date.now()}`;
    const newQrValue = `points:${shopId}:${qrPoints}:${qrId}`;
    setQrValue(newQrValue);
    toast.success(`New QR code created with ${qrPoints} points`);
  };
  
  const handleDownloadQR = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `loyalty-qr-${qrPoints}-points.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
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
              <h2 className="text-2xl font-semibold mb-4">Welcome Back, {user?.name || 'Vendor'}</h2>
              <p className="text-gray-600 mb-6">Here's an overview of your loyalty program performance.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  className="bg-[#F8F8FA] p-6 rounded-lg border border-gray-100"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center mb-2">
                    <Users className="h-5 w-5 text-[#2D5F63] mr-2" />
                    <h3 className="text-sm font-medium text-gray-500">ACTIVE MEMBERS</h3>
                  </div>
                  {isLoading ? (
                    <div className="h-8 bg-gray-200 animate-pulse rounded"></div>
                  ) : (
                    <>
                      <p className="text-3xl font-bold text-[#2D5F63]">{vendorData.activeMembers}</p>
                      <p className="text-sm text-green-600 mt-2">↑ 12% from last month</p>
                    </>
                  )}
                </motion.div>
                
                <motion.div 
                  className="bg-[#F8F8FA] p-6 rounded-lg border border-gray-100"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center mb-2">
                    <Award className="h-5 w-5 text-[#2D5F63] mr-2" />
                    <h3 className="text-sm font-medium text-gray-500">REDEMPTIONS</h3>
                  </div>
                  {isLoading ? (
                    <div className="h-8 bg-gray-200 animate-pulse rounded"></div>
                  ) : (
                    <>
                      <p className="text-3xl font-bold text-[#2D5F63]">{vendorData.redemptions}</p>
                      <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
                    </>
                  )}
                </motion.div>
                
                <motion.div 
                  className="bg-[#F8F8FA] p-6 rounded-lg border border-gray-100"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 text-[#2D5F63] mr-2" />
                    <h3 className="text-sm font-medium text-gray-500">NEW CUSTOMERS</h3>
                  </div>
                  {isLoading ? (
                    <div className="h-8 bg-gray-200 animate-pulse rounded"></div>
                  ) : (
                    <>
                      <p className="text-3xl font-bold text-[#2D5F63]">{vendorData.newCustomers}</p>
                      <p className="text-sm text-green-600 mt-2">↑ 5% this week</p>
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <motion.div 
                className="bg-white rounded-xl shadow-sm p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mb-4">Loyalty Programs</h2>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-16 bg-gray-200 animate-pulse rounded-lg"></div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {vendorData.programs.length > 0 ? vendorData.programs.map(program => (
                      <motion.div 
                        key={program.id}
                        className="flex justify-between items-center p-4 bg-[#F8F8FA] rounded-lg"
                        whileHover={{ scale: 1.02, backgroundColor: "#f2f2f7" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div>
                          <h3 className="font-medium">{program.name}</h3>
                          <p className="text-sm text-gray-500">{program.description}</p>
                        </div>
                        <Button size="sm" className="bg-[#2D5F63] text-white hover:bg-opacity-90" variant="default">Edit</Button>
                      </motion.div>
                    )) : (
                      <p className="text-gray-500 text-center py-4">No loyalty programs yet.</p>
                    )}
                  </div>
                )}
                
                <motion.div 
                  className="mt-6"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button className="bg-[#2D5F63] hover:bg-opacity-90 text-white">
                    <Plus className="h-4 w-4 mr-2" /> Add New Program
                  </Button>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-sm p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mb-4">QR Code Generator</h2>
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-4 flex items-center space-x-2">
                    <label className="text-sm font-medium">Points Value:</label>
                    <select 
                      value={qrPoints} 
                      onChange={(e) => setQrPoints(e.target.value)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                      <option value="5">5 points</option>
                      <option value="10">10 points</option>
                      <option value="15">15 points</option>
                      <option value="25">25 points</option>
                      <option value="50">50 points</option>
                    </select>
                  </div>
                  
                  <QRCode 
                    value={qrValue} 
                    size={180}
                    logo="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=64&h=64&fit=crop&crop=center"
                  />
                  
                  <div className="flex space-x-2 mt-4">
                    <Button 
                      onClick={handleCreateQR}
                      className="bg-[#2D5F63] text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Create New
                    </Button>
                    <Button 
                      onClick={handleDownloadQR}
                      variant="outline"
                    >
                      <Download className="h-4 w-4 mr-2" /> Download
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
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
