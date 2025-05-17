
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import QRCode from './QRCode';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Copy, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

interface QRGeneratorProps {
  initialPoints?: number;
  onGenerate?: (qrData: any) => void;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ 
  initialPoints = 10,
  onGenerate
}) => {
  const { user } = useAuth();
  const [points, setPoints] = useState(initialPoints);
  const [qrValue, setQrValue] = useState('');
  const [description, setDescription] = useState('');
  
  const generateQR = () => {
    if (!user) return;
    
    // In a real app, this would create a database record and return the ID
    // For demo, we'll create a structured string with the data
    const qrData = {
      type: 'loyalt-points',
      shopId: user.id,
      points: points,
      description: description || `Earn ${points} points at ${user.name}`,
      timestamp: new Date().toISOString()
    };
    
    const qrString = JSON.stringify(qrData);
    setQrValue(qrString);
    
    if (onGenerate) {
      onGenerate(qrData);
    }
    
    toast.success(`QR Code generated for ${points} points`, {
      description: 'QR Code is ready to share with customers'
    });
  };
  
  const copyQRValue = () => {
    if (qrValue) {
      navigator.clipboard.writeText(qrValue);
      toast.success('QR data copied to clipboard');
    }
  };
  
  // In a real app, this would trigger a download of the QR code as an image
  const downloadQRCode = () => {
    toast.success('QR Code downloaded');
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Generate Points QR Code</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="points">Points</Label>
            <span className="font-medium text-lg">{points}</span>
          </div>
          <Slider
            id="points"
            min={5}
            max={100}
            step={5}
            defaultValue={[points]}
            onValueChange={(values) => setPoints(values[0])}
            className="py-4"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Visit our shop and scan this QR code"
          />
        </div>
        
        <Button 
          onClick={generateQR} 
          className="w-full"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate QR Code
        </Button>
        
        {qrValue && (
          <div className="pt-4 flex flex-col items-center">
            <QRCode 
              value={qrValue} 
              size={200} 
              logo="/favicon.ico"
            />
          </div>
        )}
      </CardContent>
      
      {qrValue && (
        <CardFooter className="flex justify-center gap-2">
          <Button variant="outline" size="sm" onClick={copyQRValue}>
            <Copy className="mr-2 h-4 w-4" /> Copy Data
          </Button>
          <Button variant="outline" size="sm" onClick={downloadQRCode}>
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default QRGenerator;
