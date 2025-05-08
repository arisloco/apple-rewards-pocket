
import React from 'react';

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

const QRCode: React.FC<QRCodeProps> = ({ value, size = 150, className = "" }) => {
  // In a real app, we would use a library like qrcode.react
  // For this mockup, we'll create a simple representation
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className="bg-white p-2 rounded-lg border border-gray-200"
        style={{ width: size, height: size }}
      >
        <div className="w-full h-full bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ExampleRewardCode123')]" />
      </div>
    </div>
  );
};

export default QRCode;
