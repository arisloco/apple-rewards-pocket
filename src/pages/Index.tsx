import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import WebNavigation from '../components/WebNavigation';
import RewardCard from '../components/RewardCard';
import CardDetail from '../components/CardDetail';
import HomeCarousel from '../components/HomeCarousel';
import { 
  Coffee, Utensils, ShoppingBag, Scissors, 
  HeartPulse, Gift, Calendar, Ticket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  
  const activeRewards = [
    {
      id: "reward-1",
      title: "Free Coffee",
      shopName: "Urban Brew",
      shopLogo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=64&h=64&fit=crop&crop=center",
      description: "Enjoy a free coffee on your next visit!",
      isActive: true,
      expiryDate: "May 15, 2025",
      color: "bg-gradient-to-br from-amber-500 to-amber-600"
    }
  ];
  
  const suggestedRewards = [
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
    }
  ];

  const carouselItems = [
    {
      id: "featured-1",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=640&h=360&fit=crop",
      title: "Tech Haven",
      description: "New gadgets await - 15% off for members"
    },
    {
      id: "featured-2",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=640&h=360&fit=crop",
      title: "Sweet Treats",
      description: "Dessert paradise - Free dessert with any meal"
    },
    {
      id: "featured-3",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=640&h=360&fit=crop",
      title: "Urban Brew",
      description: "Perfect coffee, perfect day - 2x points this week"
    }
  ];
  
  const categories = [
    { id: "cat-1", name: "Coffee", icon: <Coffee size={24} />, color: "bg-amber-50" },
    { id: "cat-2", name: "Food", icon: <Utensils size={24} />, color: "bg-red-50" },
    { id: "cat-3", name: "Shopping", icon: <ShoppingBag size={24} />, color: "bg-blue-50" },
    { id: "cat-4", name: "Beauty", icon: <Scissors size={24} />, color: "bg-pink-50" },
    { id: "cat-5", name: "Health", icon: <HeartPulse size={24} />, color: "bg-green-50" },
    { id: "cat-6", name: "Gifts", icon: <Gift size={24} />, color: "bg-purple-50" },
    { id: "cat-7", name: "Events", icon: <Calendar size={24} />, color: "bg-yellow-50" },
    { id: "cat-8", name: "Entertainment", icon: <Ticket size={24} />, color: "bg-indigo-50" }
  ];
  
  const favoriteShops = [
    {
      id: "shop-1",
      name: "Urban Brew",
      logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=64&h=64&fit=crop&crop=center",
      category: "Coffee Shop",
      points: 120
    },
    {
      id: "shop-3",
      name: "Sweet Treats",
      logo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=64&h=64&fit=crop&crop=center",
      category: "Bakery",
      points: 85
    }
  ];
  
  const handleCardClick = (rewardId: string) => {
    setSelectedCard(rewardId);
  };

  const allRewards = [...activeRewards, ...suggestedRewards];
  const selectedReward = allRewards.find(reward => reward.id === selectedCard);

  // Animation variants for staggered children
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
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <WebNavigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className="premium-card p-5 rounded-2xl mb-8">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold">Good Morning, {user?.name?.split(' ')[0] || 'User'}</h2>
              <div className="bg-white/20 p-2 rounded-full">
                <Ticket className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-full p-3">
                <div className="h-10 w-10 rounded-full bg-loyalt-primary flex items-center justify-center">
                  <span className="text-white font-bold">{user?.points || 0}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-white/80">Total Points</p>
                <p className="font-semibold">You're {300 - (user?.points || 0)} points away from your next reward!</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Featured Carousel */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="section-title">Featured Shops</h2>
          <HomeCarousel items={carouselItems} />
        </motion.div>
        
        {/* Daily Offer */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="section-title">Today's Special</h2>
          <div className="daily-offer">
            <div className="flex justify-between items-start">
              <div>
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">Limited Time</span>
                <h3 className="text-xl font-bold mt-2">Double Points Tuesday!</h3>
                <p className="text-white/80 mt-1 mb-4">Earn 2x points on all purchases today</p>
                <Button className="bg-white text-loyalt-primary hover:bg-white/90">
                  View Participating Shops
                </Button>
              </div>
              <div className="bg-white/20 p-4 rounded-full">
                <Calendar className="h-8 w-8" />
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Categories */}
        <motion.div 
          initial="hidden"
          animate="show"
          variants={container}
          className="mb-8"
        >
          <h2 className="section-title">Categories</h2>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((category) => (
              <motion.div key={category.id} variants={item} className="category-card">
                <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mb-2`}>
                  {React.cloneElement(category.icon as React.ReactElement, {
                    className: "text-gray-700"
                  })}
                </div>
                <span className="text-xs font-medium text-center">{category.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Your Active Rewards */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="section-title">Your Active Rewards</h2>
          {activeRewards.length > 0 ? (
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
              <button 
                className="apple-button mt-4"
                onClick={() => navigate('/shops')}
              >
                Explore Shops
              </button>
            </div>
          )}
        </motion.div>
        
        {/* Your Favorite Shops */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="section-title">Your Favorites</h2>
          <div className="space-y-3">
            {favoriteShops.map(shop => (
              <motion.div 
                key={shop.id} 
                whileHover={{ scale: 1.01 }}
                className="premium-card flex items-center p-4"
              >
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img src={shop.logo} alt={shop.name} className="h-10 w-10 object-cover" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-bold">{shop.name}</h3>
                  <p className="text-xs text-gray-500">{shop.category}</p>
                </div>
                <div className="bg-loyalt-primary/10 px-3 py-1 rounded-full">
                  <span className="text-sm text-loyalt-primary font-medium">{shop.points} pts</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Suggested For You */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="section-title">Suggested For You</h2>
          <div className="apple-card-container">
            {suggestedRewards.map(reward => (
              <RewardCard 
                key={reward.id}
                {...reward}
                onClick={() => handleCardClick(reward.id)}
              />
            ))}
          </div>
        </motion.div>
      </main>
      
      {selectedReward && (
        <CardDetail 
          {...selectedReward}
          open={!!selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
};

export default Index;
