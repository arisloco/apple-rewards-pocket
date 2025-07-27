
import React, { useState, useEffect } from 'react';
import WebNavigation from '../components/WebNavigation';
import RewardCard from '../components/RewardCard';
import CardDetail from '../components/CardDetail';
import { motion } from 'framer-motion';
import { Wallet, Ticket, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { rewardsService } from '@/lib/rewardsService';
import { toast } from 'sonner';

const RewardsPage = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'active' | 'available' | 'expired'>('active');
  const [activeRewards, setActiveRewards] = useState<any[]>([]);
  const [availableRewards, setAvailableRewards] = useState<any[]>([]);
  const [expiredRewards, setExpiredRewards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();
  
  // Transform data from database format to component format
  const transformReward = (reward: any) => {
    if (!reward) return null;
    
    // Handle both user_rewards join format and direct rewards format
    const rewardData = reward.rewards || reward;
    const shopData = reward.shops || rewardData.shops || {};
    
    return {
      id: reward.reward_id || rewardData.id,
      title: rewardData.title,
      shopName: shopData.name || 'Shop',
      shopLogo: shopData.logo_url || `https://via.placeholder.com/64?text=${shopData.name?.charAt(0) || 'S'}`,
      description: rewardData.description,
      isActive: reward.redeemed === false,
      expiryDate: new Date(reward.expiry_date || rewardData.expiry_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      color: rewardData.color_scheme || `bg-gradient-to-br from-${getRandomColor()}-500 to-${getRandomColor()}-600`,
      pointsRequired: rewardData.points_required
    };
  };
  
  // Get random color for demo rewards
  const getRandomColor = () => {
    const colors = ['blue', 'green', 'purple', 'amber', 'rose'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  // Load rewards when user or active tab changes
  useEffect(() => {
    const fetchRewards = async () => {
      if (!user) return;
      
      setIsLoading(true);
      
      try {
        // For demo purposes, add a delay to simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Try to use rewardsService if available
        try {
          const rewards = await rewardsService.getUserRewards(user.id, activeTab);
          
          if (activeTab === 'active') {
            setActiveRewards(rewards.map(transformReward).filter(Boolean));
          } else if (activeTab === 'available') {
            setAvailableRewards(rewards.map(transformReward).filter(Boolean));
          } else {
            setExpiredRewards(rewards.map(transformReward).filter(Boolean));
          }
        } catch (error) {
          console.error('Error fetching rewards from service:', error);
          
          // Fallback to demo rewards if service fails
          if (activeTab === 'active') {
            setActiveRewards([
              {
                id: "reward-1",
                title: "Free Coffee",
                shopName: "Urban Brew",
                shopLogo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=64&h=64&fit=crop&crop=center",
                description: "Enjoy a free coffee on your next visit!",
                isActive: true,
                expiryDate: "May 15, 2025",
                color: "bg-gradient-to-br from-amber-500 to-amber-600"
              },
              {
                id: "reward-4",
                title: "Free Dessert",
                shopName: "Sweet Treats",
                shopLogo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=64&h=64&fit=crop&crop=center",
                description: "Get a free dessert with any meal purchase",
                isActive: true,
                expiryDate: "May 20, 2025",
                color: "bg-gradient-to-br from-rose-500 to-rose-600"
              }
            ]);
          } else if (activeTab === 'available') {
            setAvailableRewards([
              {
                id: "reward-2",
                title: "20% Off Lunch",
                shopName: "Fresh Bites",
                shopLogo: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=64&h=64&fit=crop&crop=center",
                description: "Get 20% off your next lunch order",
                isActive: false,
                expiryDate: "June 10, 2025",
                color: "bg-gradient-to-br from-green-500 to-green-600"
              },
              {
                id: "reward-3",
                title: "Buy 1 Get 1 Free",
                shopName: "Cozy Books",
                shopLogo: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=64&h=64&fit=crop&crop=center",
                description: "Buy any book, get one of equal or lesser value free",
                isActive: false,
                expiryDate: "May 30, 2025",
                color: "bg-gradient-to-br from-purple-500 to-purple-600"
              },
              {
                id: "reward-5",
                title: "15% Off Purchase",
                shopName: "Tech Haven",
                shopLogo: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=64&h=64&fit=crop&crop=center",
                description: "Save 15% on your next tech purchase",
                isActive: false,
                expiryDate: "June 5, 2025",
                color: "bg-gradient-to-br from-blue-500 to-blue-600"
              }
            ]);
          } else {
            setExpiredRewards([
              {
                id: "reward-6",
                title: "Free Haircut",
                shopName: "Style Studio",
                shopLogo: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=64&h=64&fit=crop&crop=center",
                description: "Get a free haircut with any color service",
                isActive: false,
                expiryDate: "April 10, 2025",
                color: "bg-gradient-to-br from-gray-400 to-gray-500"
              }
            ]);
          }
        }
      } catch (error) {
        console.error(`Error fetching ${activeTab} rewards:`, error);
        toast.error(`Failed to load rewards`);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRewards();
  }, [user, activeTab]);

  const handleCardClick = (rewardId: string) => {
    setSelectedCard(rewardId);
  };
  
  const handleRedeemReward = async (rewardId: string) => {
    if (!user) return;
    
    try {
      await rewardsService.redeemReward(user.id, rewardId);
      toast.success('Reward redeemed successfully!');
      
      // Refresh rewards lists
      const active = await rewardsService.getUserRewards(user.id, 'active');
      const available = await rewardsService.getUserRewards(user.id, 'available');
      const expired = await rewardsService.getUserRewards(user.id, 'expired');
      
      setActiveRewards(active.map(transformReward).filter(Boolean));
      setAvailableRewards(available.map(transformReward).filter(Boolean));
      setExpiredRewards(expired.map(transformReward).filter(Boolean));
    } catch (error) {
      console.error('Error redeeming reward:', error);
      toast.error('Failed to redeem reward');
    }
  };

  const allRewards = [...activeRewards, ...availableRewards, ...expiredRewards];
  const selectedReward = allRewards.find(reward => reward.id === selectedCard);
  
  const tabVariants = {
    active: { opacity: 1, y: 0 },
    inactive: { opacity: 0, y: 20, display: 'none' }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <WebNavigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 premium-card p-5 rounded-2xl"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="font-bold flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                {user?.membershipLevel?.charAt(0).toUpperCase() + user?.membershipLevel?.slice(1) || 'Standard'} Member
              </h2>
              <p className="text-sm text-gray-500">You have {user?.points || 0} total points</p>
            </div>
            <Button size="sm" variant="outline" className="rounded-full">
              <Wallet className="h-4 w-4 mr-1" /> Add to Wallet
            </Button>
          </div>
          
          <div className="bg-gray-100 h-2 rounded-full w-full">
            <div className="bg-loyalt-primary h-2 rounded-full" style={{ 
              width: user?.points ? `${Math.min((user.points / (user.points + 50)) * 100, 100)}%` : '0%' 
            }}></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">0</span>
            <span className="text-xs font-medium">{user?.points || 0} pts</span>
            <span className="text-xs text-gray-500">{user?.points ? user.points + 50 : 50}</span>
          </div>
          <p className="text-xs text-center mt-2 text-gray-600">
            {user?.points ? 50 : 0} points until next reward
          </p>
        </motion.div>
        
        {/* Tabs */}
        <div className="relative mb-6">
          <div className="flex mb-6 border-b">
            <button
              className={`pb-2 px-4 text-sm font-medium flex items-center ${
                activeTab === 'active' 
                  ? 'text-loyalt-primary border-b-2 border-loyalt-primary' 
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('active')}
            >
              <Ticket className="h-4 w-4 mr-1" />
              Active
              {activeRewards.length > 0 && (
                <span className="ml-1 bg-loyalt-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {activeRewards.length}
                </span>
              )}
            </button>
            <button
              className={`pb-2 px-4 text-sm font-medium flex items-center ${
                activeTab === 'available' 
                  ? 'text-loyalt-primary border-b-2 border-loyalt-primary' 
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('available')}
            >
              <Star className="h-4 w-4 mr-1" />
              Available
              {availableRewards.length > 0 && (
                <span className="ml-1 bg-loyalt-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {availableRewards.length}
                </span>
              )}
            </button>
            <button
              className={`pb-2 px-4 text-sm font-medium flex items-center ${
                activeTab === 'expired' 
                  ? 'text-loyalt-primary border-b-2 border-loyalt-primary' 
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('expired')}
            >
              <Clock className="h-4 w-4 mr-1" />
              Expired
            </button>
          </div>
        </div>
        
        {/* Active Rewards Tab */}
        <motion.div 
          initial={activeTab === 'active' ? 'active' : 'inactive'}
          animate={activeTab === 'active' ? 'active' : 'inactive'}
          variants={tabVariants}
          className="mb-8"
        >
          {isLoading ? (
            <div className="apple-card p-8 flex justify-center">
              <div className="w-8 h-8 border-2 border-loyalt-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : activeRewards.length > 0 ? (
            <div className="apple-card-container">
              {activeRewards.map(reward => (
                <RewardCard 
                  key={reward.id}
                  {...reward}
                  onClick={() => handleCardClick(reward.id)}
                />
              ))}
            </div>
          ) : (
            <div className="apple-card text-center p-8">
              <p>No active rewards yet</p>
              <button className="apple-button mt-4" onClick={() => setActiveTab('available')}>
                Explore Available Rewards
              </button>
            </div>
          )}
        </motion.div>
        
        {/* Available Rewards Tab */}
        <motion.div 
          initial={activeTab === 'available' ? 'active' : 'inactive'}
          animate={activeTab === 'available' ? 'active' : 'inactive'}
          variants={tabVariants}
          className="mb-8"
        >
          {isLoading ? (
            <div className="apple-card p-8 flex justify-center">
              <div className="w-8 h-8 border-2 border-loyalt-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : availableRewards.length > 0 ? (
            <div className="apple-card-container">
              {availableRewards.map(reward => (
                <RewardCard 
                  key={reward.id}
                  {...reward}
                  onClick={() => handleCardClick(reward.id)}
                />
              ))}
            </div>
          ) : (
            <div className="apple-card p-6">
              <p className="text-center text-gray-500">No available rewards</p>
            </div>
          )}
        </motion.div>
        
        {/* Expired Rewards Tab */}
        <motion.div 
          initial={activeTab === 'expired' ? 'active' : 'inactive'}
          animate={activeTab === 'expired' ? 'active' : 'inactive'}
          variants={tabVariants}
          className="mb-8"
        >
          {isLoading ? (
            <div className="apple-card p-8 flex justify-center">
              <div className="w-8 h-8 border-2 border-loyalt-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : expiredRewards.length > 0 ? (
            <div className="apple-card-container">
              {expiredRewards.map(reward => (
                <RewardCard 
                  key={reward.id}
                  {...reward}
                  onClick={() => handleCardClick(reward.id)}
                />
              ))}
            </div>
          ) : (
            <div className="apple-card p-6">
              <p className="text-center text-gray-500">No expired rewards</p>
            </div>
          )}
        </motion.div>
      </main>
      
      {selectedReward && (
        <CardDetail 
          {...selectedReward}
          open={!!selectedCard}
          onClose={() => setSelectedCard(null)}
          onRedeem={selectedReward.isActive ? () => handleRedeemReward(selectedReward.id) : undefined}
        />
      )}
    </div>
  );
};

export default RewardsPage;
