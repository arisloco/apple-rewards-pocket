
import React from 'react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import { Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ScanPage = () => {
  return (
    <div className="min-h-screen bg-apple-light-gray pb-20">
      <Header />
      
      <main className="apple-container flex flex-col items-center justify-center pt-10">
        <div className="apple-card p-8 mb-6 w-full max-w-md flex flex-col items-center">
          <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <Scan className="h-10 w-10 text-gray-600" strokeWidth={1.5} />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">Scan a Code</h2>
          <p className="text-gray-500 text-center mb-6">
            Point your camera at a QR code to earn points or activate rewards
          </p>
          
          <Button className="bg-apple-blue w-full">
            Open Camera
          </Button>
        </div>
        
        <div className="apple-card p-6 mb-6 w-full max-w-md">
          <h3 className="font-bold mb-4">How to scan</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center mr-4">
                <span className="font-medium">1</span>
              </div>
              <p>Visit a participating shop and look for the reward QR code</p>
            </div>
            
            <div className="flex items-start">
              <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center mr-4">
                <span className="font-medium">2</span>
              </div>
              <p>Open the app and tap on the Scan tab</p>
            </div>
            
            <div className="flex items-start">
              <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center mr-4">
                <span className="font-medium">3</span>
              </div>
              <p>Point your camera at the QR code to earn points or activate rewards</p>
            </div>
          </div>
        </div>
      </main>

      <TabBar />
    </div>
  );
};

export default ScanPage;
