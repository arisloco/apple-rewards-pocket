
import React, { useState } from 'react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import GoogleMap from '../components/GoogleMap';
import { SearchIcon, Filter, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ShopsPage = () => {
  const [view, setView] = useState<'map' | 'list'>('map');
  const [searchText, setSearchText] = useState('');
  
  const shops = [
    {
      id: "shop-1",
      name: "Urban Brew",
      logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=64&h=64&fit=crop&crop=center",
      category: "Coffee Shop",
      distance: "0.3 mi",
      rating: 4.8,
      location: { lat: 37.7749, lng: -122.4194 }
    },
    {
      id: "shop-2",
      name: "Fresh Bites",
      logo: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=64&h=64&fit=crop&crop=center",
      category: "Restaurant",
      distance: "1.2 mi",
      rating: 4.5,
      location: { lat: 37.7833, lng: -122.4167 }
    },
    {
      id: "shop-3",
      name: "Sweet Treats",
      logo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=64&h=64&fit=crop&crop=center",
      category: "Bakery",
      distance: "0.5 mi",
      rating: 4.7,
      location: { lat: 37.7694, lng: -122.4862 }
    },
    {
      id: "shop-4",
      name: "Cozy Books",
      logo: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=64&h=64&fit=crop&crop=center",
      category: "Bookstore",
      distance: "1.8 mi",
      rating: 4.3,
      location: { lat: 37.7835, lng: -122.4506 }
    },
    {
      id: "shop-5",
      name: "Tech Haven",
      logo: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=64&h=64&fit=crop&crop=center",
      category: "Electronics",
      distance: "2.1 mi",
      rating: 4.6,
      location: { lat: 37.7879, lng: -122.4074 }
    }
  ];

  const filteredShops = shops.filter(
    (shop) => 
      shop.name.toLowerCase().includes(searchText.toLowerCase()) || 
      shop.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const categories = [
    "Coffee", "Food", "Retail", "Services", "Beauty", "Wellness"
  ];

  return (
    <div className="min-h-screen bg-apple-light-gray pb-20">
      <Header />
      
      <main className="apple-container">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="Search shops nearby..."
                className="w-full p-3 pl-10 rounded-xl border border-gray-200 bg-white shadow-sm"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <div className="absolute left-3 top-3.5">
                <SearchIcon className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <Button variant="outline" className="rounded-xl p-3 aspect-square">
              <Filter className="h-5 w-5" />
            </Button>
            <Button 
              variant={view === 'list' ? "outline" : "default"}
              className="rounded-xl p-3 aspect-square"
              onClick={() => setView('map')}
            >
              <MapPin className="h-5 w-5" />
            </Button>
            <Button 
              variant={view === 'map' ? "outline" : "default"}
              className="rounded-xl p-3 aspect-square" 
              onClick={() => setView('list')}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </Button>
          </div>
        </div>
        
        {view === 'map' ? (
          <div className="mb-8">
            <GoogleMap shops={shops} />
            <div className="mt-4">
              <h2 className="section-title">Nearby Shops</h2>
              <div className="space-y-3">
                {filteredShops.slice(0, 3).map(shop => (
                  <div key={shop.id} className="premium-card flex items-center p-4">
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img src={shop.logo} alt={shop.name} className="h-10 w-10 object-cover" />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center">
                        <h3 className="font-bold">{shop.name}</h3>
                        <div className="ml-2 flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400" />
                          <span className="text-xs ml-1">{shop.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">{shop.category} • {shop.distance}</p>
                    </div>
                    <Button className="bg-loyalt-primary text-xs py-2 px-4">
                      View
                    </Button>
                  </div>
                ))}
              </div>
              {filteredShops.length > 3 && (
                <Button variant="link" className="mt-2 text-loyalt-primary">
                  See All ({filteredShops.length})
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <h2 className="section-title">All Shops</h2>
            <div className="space-y-3">
              {filteredShops.map(shop => (
                <div key={shop.id} className="premium-card flex items-center p-4">
                  <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src={shop.logo} alt={shop.name} className="h-12 w-12 object-cover" />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center">
                      <h3 className="font-bold">{shop.name}</h3>
                      <div className="ml-2 flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400" />
                        <span className="text-xs ml-1">{shop.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{shop.category} • {shop.distance}</p>
                    <div className="flex mt-2">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full mr-1">Rewards</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">Points</span>
                    </div>
                  </div>
                  <Button className="bg-loyalt-primary text-xs py-2 px-4">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mb-8">
          <h2 className="section-title">Categories</h2>
          <div className="grid grid-cols-3 gap-3">
            {categories.map(category => (
              <div key={category} className="premium-card p-4 text-center">
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
