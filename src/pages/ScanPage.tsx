
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WebNavigation from '@/components/WebNavigation';
import QRScanner from '@/components/QRScanner';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Award, CheckCircle2 } from 'lucide-react';

interface ScanResult {
  type: string;
  shopId: string;
  points: number;
  description: string;
  timestamp: string;
}

const ScanPage = () => {
  const { user } = useAuth();
  const [lastScan, setLastScan] = useState<ScanResult | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleScan = (data: string) => {
    try {
      // Parse the QR code data
      const scanResult: ScanResult = JSON.parse(data);
      
      if (scanResult.type === 'loyalt-points') {
        setLastScan(scanResult);
        setShowSuccess(true);
        
        // In a real app, this would call the API to add points to the user's account
        toast.success(`You earned ${scanResult.points} points!`, {
          description: scanResult.description
        });
        
        // Reset success animation after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        toast.error('Invalid QR code format');
      }
    } catch (error) {
      console.error('Error parsing QR code:', error);
      toast.error('Could not read QR code');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <WebNavigation />
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4 text-center">Scan QR Code</h2>
              
              <QRScanner onScan={handleScan} />
              
              {lastScan && (
                <div className="mt-6 pt-4 border-t">
                  <h3 className="font-medium">Last Scan:</h3>
                  <p className="text-sm text-gray-600">{lastScan.description}</p>
                  <p className="text-lg font-bold">+{lastScan.points} points</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>
      
      {/* Success overlay */}
      {showSuccess && (
        <motion.div 
          className="fixed inset-0 bg-emerald-500/90 z-50 flex items-center justify-center flex-col text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10 }}
          >
            <CheckCircle2 size={120} strokeWidth={1.5} />
          </motion.div>
          
          <motion.div 
            className="text-center mt-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold">Points Added!</h2>
            <p className="text-xl mt-2">+{lastScan?.points} points</p>
            
            {user && (
              <p className="mt-6 flex items-center justify-center gap-2">
                <Award className="h-5 w-5" />
                <span>Total: {(user.points || 0) + (lastScan?.points || 0)} points</span>
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ScanPage;
