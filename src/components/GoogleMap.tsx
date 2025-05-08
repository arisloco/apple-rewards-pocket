
import React, { useEffect, useState } from 'react';

interface Shop {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  category: string;
  logo: string;
}

interface GoogleMapProps {
  shops: Shop[];
}

const GoogleMap: React.FC<GoogleMapProps> = ({ shops }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  
  // Google Maps API Placeholder - In a real app, you'd use a proper API key
  useEffect(() => {
    // Check if Google Maps API is already loaded
    if (window.google && window.google.maps) {
      initMap();
      return;
    }

    // Add Google Maps script
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=PLEASE_ADD_YOUR_KEY&libraries=places`;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    window.document.body.appendChild(googleMapScript);
    
    googleMapScript.addEventListener('load', () => {
      setMapLoaded(true);
      initMap();
    });
    
    return () => {
      // Cleanup markers
      markers.forEach(marker => marker.setMap(null));
    };
  }, [shops]);
  
  const initMap = () => {
    const mapElement = document.getElementById('google-map');
    if (!mapElement) return;
    
    const map = new google.maps.Map(mapElement, {
      center: { lat: 37.7749, lng: -122.4194 }, // Default center (San Francisco)
      zoom: 13,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        },
        {
          featureType: 'transit',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#e9e9e9' }]
        },
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [{ color: '#f5f5f5' }]
        },
      ],
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    });
    
    setMapInstance(map);
    
    // Add markers for shops
    const newMarkers = shops.map(shop => {
      const marker = new google.maps.Marker({
        position: shop.location,
        map: map,
        title: shop.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#009ea3" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          `),
          scaledSize: new google.maps.Size(30, 30)
        }
      });
      
      const infoContent = `
        <div style="padding: 10px; max-width: 200px;">
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <img src="${shop.logo}" alt="${shop.name}" style="width: 32px; height: 32px; border-radius: 50%; margin-right: 8px;">
            <strong>${shop.name}</strong>
          </div>
          <div>${shop.category}</div>
          <button style="background: #009ea3; color: white; border: none; padding: 6px 12px; border-radius: 16px; margin-top: 10px; cursor: pointer;">View Details</button>
        </div>
      `;
      
      const infoWindow = new google.maps.InfoWindow({
        content: infoContent
      });
      
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
      
      return marker;
    });
    
    setMarkers(newMarkers);
    
    // Fit map to markers
    if (shops.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      shops.forEach(shop => {
        bounds.extend(shop.location);
      });
      map.fitBounds(bounds);
    }
  };
  
  return (
    <div className="h-[60vh] w-full rounded-2xl overflow-hidden shadow-premium">
      <div id="google-map" className="w-full h-full"></div>
    </div>
  );
};

export default GoogleMap;
