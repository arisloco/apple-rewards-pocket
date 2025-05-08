
import React from 'react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';

const ShopsPage = () => {
  const shops = [
    {
      id: "shop-1",
      name: "Urban Brew",
      logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=64&h=64&fit=crop&crop=center",
      category: "Coffee Shop",
      distance: "0.3 mi"
    },
    {
      id: "shop-2",
      name: "Fresh Bites",
      logo: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=64&h=64&fit=crop&crop=center",
      category: "Restaurant",
      distance: "1.2 mi"
    },
    {
      id: "shop-3",
      name: "Sweet Treats",
      logo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=64&h=64&fit=crop&crop=center",
      category: "Bakery",
      distance: "0.5 mi"
    },
    {
      id: "shop-4",
      name: "Cozy Books",
      logo: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=64&h=64&fit=crop&crop=center",
      category: "Bookstore",
      distance: "1.8 mi"
    },
    {
      id: "shop-5",
      name: "Tech Haven",
      logo: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=64&h=64&fit=crop&crop=center",
      category: "Electronics",
      distance: "2.1 mi"
    }
  ];

  return (
    <div className="min-h-screen bg-apple-light-gray pb-20">
      <Header />
      
      <main className="apple-container">
        <div className="mb-6">
          <div className="relative">
            <input
              type="search"
              placeholder="Search shops nearby..."
              className="w-full p-3 pl-10 rounded-xl border border-gray-200 bg-white shadow-sm"
            />
            <div className="absolute left-3 top-3.5">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Nearby Shops</h2>
          <div className="space-y-3">
            {shops.map(shop => (
              <div key={shop.id} className="apple-card flex items-center p-4">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img src={shop.logo} alt={shop.name} className="h-10 w-10 object-cover" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-bold">{shop.name}</h3>
                  <p className="text-xs text-gray-500">{shop.category} • {shop.distance}</p>
                </div>
                <button className="apple-button text-xs py-2 px-4">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <div className="grid grid-cols-2 gap-3">
            {["Coffee", "Food", "Retail", "Services", "Beauty", "Wellness"].map(category => (
              <div key={category} className="apple-card p-4 text-center">
                <p className="font-medium">{category}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <TabBar />
    </div>
  );
};

export default ShopsPage;
