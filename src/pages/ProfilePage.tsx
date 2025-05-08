
import React from 'react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-apple-light-gray pb-20">
      <Header />
      
      <main className="apple-container">
        <div className="apple-card p-6 mb-6">
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold">Emma Johnson</h2>
            <p className="text-gray-500 text-sm">emma@example.com</p>
            <button className="mt-4 text-apple-blue font-medium text-sm">
              Edit Profile
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Reward Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="apple-card p-4">
              <h3 className="text-sm text-gray-500">Active Rewards</h3>
              <p className="text-2xl font-bold">2</p>
            </div>
            <div className="apple-card p-4">
              <h3 className="text-sm text-gray-500">Redeemed</h3>
              <p className="text-2xl font-bold">5</p>
            </div>
            <div className="apple-card p-4">
              <h3 className="text-sm text-gray-500">Total Points</h3>
              <p className="text-2xl font-bold">248</p>
            </div>
            <div className="apple-card p-4">
              <h3 className="text-sm text-gray-500">Shops Visited</h3>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </div>
        
        <div className="mb-6 space-y-3">
          <h2 className="text-xl font-bold mb-4">Settings</h2>
          {["Notification Preferences", "Connected Accounts", "Language", "Privacy Settings", "Help & Support", "About"].map(setting => (
            <div key={setting} className="apple-card p-4 flex justify-between items-center">
              <span>{setting}</span>
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          ))}
        </div>
      </main>

      <TabBar />
    </div>
  );
};

export default ProfilePage;
