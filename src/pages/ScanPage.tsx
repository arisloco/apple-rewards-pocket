
import React, { useState } from 'react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import { Scan, Camera, CameraOff, FlashOn, FlashOff, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const ScanPage = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  
  const toggleCamera = () => {
    setCameraActive(!cameraActive);
  };
  
  const toggleFlash = () => {
    setFlashOn(!flashOn);
  };
  
  return (
    <div className="min-h-screen bg-apple-light-gray pb-20">
      <Header />
      
      <main className="apple-container pt-4">
        {cameraActive ? (
          <div className="relative mb-6">
            <div className="bg-black rounded-2xl h-[60vh] w-full flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full">
                {/* Camera view placeholder */}
                <div className="w-full h-full bg-black">
                  <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <path fill="none" stroke="#ffffff" strokeWidth="1" d="M20,20L80,80M80,20L20,80" />
                  </svg>
                </div>

                {/* QR code scanner frame */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border-2 border-white/80 rounded-2xl">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-loyalt-primary rounded-tl"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-loyalt-primary rounded-tr"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-loyalt-primary rounded-bl"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-loyalt-primary rounded-br"></div>
                  </div>
                </div>
                
                {/* Scanning animation */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div 
                    className="w-64 h-1 bg-loyalt-primary/60"
                    initial={{ y: -120 }}
                    animate={{ y: 120 }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      repeatType: "reverse" 
                    }}
                  ></motion.div>
                </div>
                
                {/* Camera controls */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-6">
                  <button 
                    className="w-12 h-12 bg-white/20 rounded-full backdrop-blur-md flex items-center justify-center"
                    onClick={toggleFlash}
                  >
                    {flashOn ? <FlashOff className="text-white" /> : <FlashOn className="text-white" />}
                  </button>
                  <button 
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center"
                    onClick={toggleCamera}
                  >
                    <CameraOff className="text-loyalt-primary" size={28} />
                  </button>
                  <button className="w-12 h-12 bg-white/20 rounded-full backdrop-blur-md flex items-center justify-center">
                    <QrCode className="text-white" />
                  </button>
                </div>
                
                {/* Status text */}
                <div className="absolute top-6 left-0 right-0 text-center">
                  <p className="text-white font-medium bg-black/40 backdrop-blur-md mx-auto w-max px-4 py-1 rounded-full text-sm">
                    Scanning for QR Code...
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="premium-card p-8 mb-6 w-full max-w-md flex flex-col items-center">
              <div className="h-20 w-20 rounded-full bg-loyalt-primary/10 flex items-center justify-center mb-6">
                <Scan className="h-10 w-10 text-loyalt-primary" strokeWidth={1.5} />
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Scan a Code</h2>
              <p className="text-gray-500 text-center mb-6">
                Point your camera at a QR code to earn points or activate rewards
              </p>
              
              <Button
                onClick={toggleCamera}
                className="w-full py-6 bg-loyalt-primary text-white font-medium rounded-full hover:bg-opacity-90"
              >
                <Camera className="mr-2 h-5 w-5" />
                Open Camera
              </Button>
            </div>
            
            <div className="premium-card p-6 mb-6 w-full max-w-md">
              <h3 className="font-bold mb-4">How to scan</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-loyalt-primary/10 rounded-full h-8 w-8 flex items-center justify-center mr-4">
                    <span className="text-loyalt-primary font-medium">1</span>
                  </div>
                  <p>Visit a participating shop and look for the reward QR code</p>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-loyalt-primary/10 rounded-full h-8 w-8 flex items-center justify-center mr-4">
                    <span className="text-loyalt-primary font-medium">2</span>
                  </div>
                  <p>Open the app and tap on the Scan tab</p>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-loyalt-primary/10 rounded-full h-8 w-8 flex items-center justify-center mr-4">
                    <span className="text-loyalt-primary font-medium">3</span>
                  </div>
                  <p>Point your camera at the QR code to earn points or activate rewards</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {!cameraActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3 } }}
            className="premium-card p-6 mb-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold mb-1">Recent Activity</h3>
                <p className="text-sm text-gray-500">Your recent scan history</p>
              </div>
              <Button variant="ghost" className="text-loyalt-primary">See All</Button>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden mr-3">
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=64&h=64&fit=crop&crop=center" alt="Urban Brew" className="h-8 w-8 object-cover" />
                  </div>
                  <div>
                    <p className="font-medium">Urban Brew</p>
                    <p className="text-xs text-gray-500">+10 points added</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">Today</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden mr-3">
                    <img src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=64&h=64&fit=crop&crop=center" alt="Sweet Treats" className="h-8 w-8 object-cover" />
                  </div>
                  <div>
                    <p className="font-medium">Sweet Treats</p>
                    <p className="text-xs text-gray-500">Free Dessert activated</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">Yesterday</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      <TabBar />
    </div>
  );
};

export default ScanPage;
