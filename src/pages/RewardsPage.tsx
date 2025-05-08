
import React, { useState } from 'react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import RewardCard from '../components/RewardCard';
import CardDetail from '../components/CardDetail';

const RewardsPage = () => {
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
  ];

  const handleCardClick = (rewardId: string) => {
    setSelectedCard(rewardId);
  };

  const allRewards = [...activeRewards, ...suggestedRewards];
  const selectedReward = allRewards.find(reward => reward.id === selectedCard);

  return (
    <div className="min-h-screen bg-apple-light-gray pb-20">
      <Header />
      
      <main className="apple-container pt-2">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Active Rewards</h2>
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
              <button className="apple-button mt-4">
                Explore Shops
              </button>
            </div>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Available Rewards</h2>
          <div className="apple-card-container">
            {suggestedRewards.map(reward => (
              <RewardCard 
                key={reward.id}
                {...reward}
                onClick={() => handleCardClick(reward.id)}
              />
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Expiring Soon</h2>
          <div className="apple-card p-6">
            <p className="text-center text-gray-500">No rewards expiring soon</p>
          </div>
        </div>
      </main>

      <TabBar />
      
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

export default RewardsPage;
