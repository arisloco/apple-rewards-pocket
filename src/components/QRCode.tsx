
import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
  logo?: string;
  logoSize?: number;
  backgroundColor?: string;
  foregroundColor?: string;
}

const QRCode: React.FC<QRCodeProps> = ({ 
  value, 
  size = 150, 
  className = "",
  logo,
  logoSize = 24,
  backgroundColor = "#ffffff",
  foregroundColor = "#000000"
}) => {
  const [qrValue, setQrValue] = useState(value);
  
  useEffect(() => {
    setQrValue(value);
  }, [value]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className="bg-white p-2 rounded-lg border border-gray-200"
        style={{ width: size, height: size }}
      >
        <QRCodeSVG
          value={qrValue}
          size={size - 16} // Account for padding
          bgColor={backgroundColor}
          fgColor={foregroundColor}
          level="H" // High error correction for logo
          imageSettings={logo ? {
            src: logo,
            x: undefined,
            y: undefined,
            height: logoSize,
            width: logoSize,
            excavate: true,
          } : undefined}
        />
      </div>
    </div>
  );
};

export default QRCode;
