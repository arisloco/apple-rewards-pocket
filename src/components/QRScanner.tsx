
import React, { useEffect, useState, useRef } from 'react';
import { qrScannerService } from '@/lib/qrScanner';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Loader2, Camera, CameraOff } from 'lucide-react';

interface QRScannerProps {
  onScan?: (data: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan }) => {
  const { user } = useAuth();
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoElementId = 'qr-video-element';
  
  const startScanner = async () => {
    if (!videoRef.current) return;
    
    setIsLoading(true);
    
    try {
      await qrScannerService.startScanner(
        videoElementId,
        (result) => {
          // Handle successful scan
          if (onScan) {
            onScan(result);
          } else {
            toast.success(`QR Code scanned: ${result}`);
            
            // For demo, simulate points being added
            if (user && result) {
              toast.success(`You earned 10 points!`, {
                description: 'Points have been added to your account.'
              });
              
              // Stop scanner after successful scan
              stopScanner();
            }
          }
        },
        (error) => {
          toast.error('QR Scan failed. Please try again.');
          console.error('QR Scan error:', error);
          setHasPermission(false);
        }
      );
      
      setIsScanning(true);
      setHasPermission(true);
    } catch (error) {
      toast.error('Failed to start scanner');
      console.error(error);
      setHasPermission(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  const stopScanner = () => {
    qrScannerService.stopScanner();
    setIsScanning(false);
  };
  
  const toggleScanner = () => {
    if (isScanning) {
      stopScanner();
    } else {
      startScanner();
    }
  };
  
  useEffect(() => {
    // Clean up on component unmount
    return () => {
      qrScannerService.stopScanner();
    };
  }, []);
  
  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      <div 
        className="relative w-full aspect-square max-w-md bg-black rounded-lg overflow-hidden"
      >
        <video
          id={videoElementId}
          ref={videoRef}
          className="w-full h-full object-cover"
        />
        
        {/* Scanner targeting overlay */}
        {isScanning && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-2/3 h-2/3 border-2 border-white/60 rounded-lg">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary rounded-br-lg"></div>
            </div>
          </div>
        )}
        
        {!isScanning && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white">
            <div className="text-center">
              <CameraOff className="mx-auto mb-2" size={48} />
              <p>Camera is off</p>
            </div>
          </div>
        )}
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        )}
      </div>
      
      <Button 
        onClick={toggleScanner} 
        className="w-full max-w-md"
        disabled={isLoading}
        variant={isScanning ? "destructive" : "default"}
      >
        {isLoading ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Requesting camera...</>
        ) : isScanning ? (
          <><CameraOff className="mr-2 h-4 w-4" /> Stop Camera</>
        ) : (
          <><Camera className="mr-2 h-4 w-4" /> Start Camera</>
        )}
      </Button>
      
      {hasPermission === false && (
        <div className="text-red-500 text-sm max-w-md text-center">
          Camera permission denied. Please check your browser settings and allow camera access.
        </div>
      )}
    </div>
  );
};

export default QRScanner;
