
import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import { Scan, Camera, CameraOff, Zap, ZapOff, QrCode, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { qrScannerService } from '@/lib/qrScanner';
import { rewardsService, QRScanResult } from '@/lib/rewardsService';
import { toast } from 'sonner';

const ScanPage = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [scanResult, setScanResult] = useState<QRScanResult | null>(null);
  const [scanSuccess, setScanSuccess] = useState<boolean | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentScans, setRecentScans] = useState<any[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<any>(null);
  
  // Get recent scans from local storage or initialize empty array
  useEffect(() => {
    const savedScans = localStorage.getItem('recentScans');
    if (savedScans) {
      setRecentScans(JSON.parse(savedScans));
    }
  }, []);
  
  // Save recent scans to local storage when they change
  useEffect(() => {
    localStorage.setItem('recentScans', JSON.stringify(recentScans));
  }, [recentScans]);
  
  // Clean up camera when component unmounts
  useEffect(() => {
    return () => {
      if (cameraActive) {
        qrScannerService.stopScanner();
      }
    };
  }, [cameraActive]);
  
  const toggleCamera = () => {
    if (cameraActive) {
      qrScannerService.stopScanner();
      setCameraActive(false);
    } else {
      setCameraActive(true);
      startScanner();
    }
  };
  
  const startScanner = async () => {
    if (!videoRef.current) return;
    
    try {
      setScanResult(null);
      setScanSuccess(null);
      
      controlsRef.current = await qrScannerService.startScanner(
        'qr-video',
        handleScanSuccess,
        (error) => {
          console.error('QR scan error:', error);
          toast.error('Failed to scan QR code');
          setCameraActive(false);
        }
      );
    } catch (error) {
      console.error('Error starting scanner:', error);
      toast.error('Failed to access camera');
      setCameraActive(false);
    }
  };
  
  const handleScanSuccess = async (text: string) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    try {
      // Process the QR code
      const result = await rewardsService.processQRCode(text);
      
      setScanResult(result);
      setScanSuccess(!!result);
      
      // Add to recent scans if successful
      if (result) {
        const newScan = {
          id: Date.now().toString(),
          type: result.type,
          value: result.value,
          shopId: result.shopId,
          timestamp: new Date().toISOString(),
          description: result.description || (result.type === 'points' ? `Earned ${result.value} points` : 'Redeemed reward')
        };
        
        setRecentScans(prev => [newScan, ...prev.slice(0, 9)]);
        
        // Show success notification
        toast.success(
          result.type === 'points' 
            ? `You earned ${result.value} points!` 
            : 'Reward redeemed successfully!'
        );
      } else {
        toast.error('Failed to process QR code');
      }
    } catch (error) {
      console.error('Error processing scan:', error);
      toast.error('Error processing QR code');
      setScanSuccess(false);
    } finally {
      // Pause scanner briefly to show result
      if (controlsRef.current) {
        qrScannerService.stopScanner();
      }
      
      // Resume scanner after a delay
      setTimeout(() => {
        setIsProcessing(false);
        
        // Close camera if successful
        if (scanSuccess) {
          setCameraActive(false);
        } else {
          startScanner();
        }
      }, 3000);
    }
  };
  
  const toggleFlash = () => {
    // Flash functionality would require additional implementation with device APIs
    setFlashOn(!flashOn);
    toast.info(flashOn ? 'Flash turned off' : 'Flash turned on');
  };
  
  return (
    <div className="min-h-screen bg-apple-light-gray pb-20">
      <Header />
      
      <main className="apple-container pt-4">
        {cameraActive ? (
          <div className="relative mb-6">
            <div className="bg-black rounded-2xl h-[60vh] w-full flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full">
                {/* Camera view */}
                <video
                  id="qr-video"
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  playsInline
                  muted
                />

                {/* QR code scanner frame */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 border-2 border-white/80 rounded-2xl">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-loyalt-primary rounded-tl"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-loyalt-primary rounded-tr"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-loyalt-primary rounded-bl"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-loyalt-primary rounded-br"></div>
                  </div>
                </div>
                
                {/* Scanning animation */}
                <AnimatePresence>
                  {!scanResult && !isProcessing && (
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      key="scanner-line"
                    >
                      <motion.div 
                        className="w-64 h-1 bg-loyalt-primary/60"
                        initial={{ y: -120 }}
                        animate={{ y: 120 }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          repeatType: "reverse" 
                        }}
                      />
                    </motion.div>
                  )}
                  
                  {/* Scan result animation */}
                  {scanSuccess !== null && (
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      key="scan-result"
                    >
                      <div className={`w-32 h-32 rounded-full bg-opacity-80 flex items-center justify-center ${
                        scanSuccess ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {scanSuccess ? (
                          <CheckCircle2 size={64} className="text-white" />
                        ) : (
                          <XCircle size={64} className="text-white" />
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Camera controls */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-6">
                  <button 
                    className="w-12 h-12 bg-white/20 rounded-full backdrop-blur-md flex items-center justify-center"
                    onClick={toggleFlash}
                    disabled={isProcessing}
                  >
                    {flashOn ? <ZapOff className="text-white" /> : <Zap className="text-white" />}
                  </button>
                  <button 
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center"
                    onClick={toggleCamera}
                    disabled={isProcessing}
                  >
                    <CameraOff className="text-loyalt-primary" size={28} />
                  </button>
                  <button 
                    className="w-12 h-12 bg-white/20 rounded-full backdrop-blur-md flex items-center justify-center"
                    disabled={isProcessing}
                  >
                    <QrCode className="text-white" />
                  </button>
                </div>
                
                {/* Status text */}
                <div className="absolute top-6 left-0 right-0 text-center">
                  <p className="text-white font-medium bg-black/40 backdrop-blur-md mx-auto w-max px-4 py-1 rounded-full text-sm">
                    {isProcessing 
                      ? 'Processing...' 
                      : scanResult 
                        ? scanSuccess 
                          ? 'Success!' 
                          : 'Failed to process QR code' 
                        : 'Scanning for QR Code...'}
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
        
        {!cameraActive && recentScans.length > 0 && (
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
              {recentScans.slice(0, 5).map((scan, index) => {
                // Format date as relative time (today, yesterday, or date)
                const scanDate = new Date(scan.timestamp);
                const today = new Date();
                const yesterday = new Date();
                yesterday.setDate(today.getDate() - 1);
                
                let displayDate = scanDate.toLocaleDateString();
                if (scanDate.toDateString() === today.toDateString()) {
                  displayDate = 'Today';
                } else if (scanDate.toDateString() === yesterday.toDateString()) {
                  displayDate = 'Yesterday';
                }
                
                return (
                  <div key={scan.id} className={`flex items-center justify-between py-2 ${
                    index < recentScans.length - 1 ? 'border-b border-gray-100' : ''
                  }`}>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden mr-3">
                        {scan.shopId === 'shop-1' ? (
                          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=64&h=64&fit=crop&crop=center" alt="Urban Brew" className="h-8 w-8 object-cover" />
                        ) : scan.shopId === 'shop-3' ? (
                          <img src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=64&h=64&fit=crop&crop=center" alt="Sweet Treats" className="h-8 w-8 object-cover" />
                        ) : (
                          <Scan className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{
                          scan.shopId === 'shop-1' ? 'Urban Brew' : 
                          scan.shopId === 'shop-3' ? 'Sweet Treats' : 
                          'Shop'
                        }</p>
                        <p className="text-xs text-gray-500">{scan.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500">{displayDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </main>

      <TabBar />
    </div>
  );
};

export default ScanPage;
