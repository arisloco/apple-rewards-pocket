
import React from 'react';
import { Info } from 'lucide-react';
import QRCode from './QRCode';

export interface RewardCardProps {
  id: string;
  title: string;
  shopName: string;
  shopLogo: string;
  description: string;
  isActive: boolean;
  expiryDate: string;
  color?: string;
  onClick?: () => void;
}

const RewardCard: React.FC<RewardCardProps> = ({
  id,
  title,
  shopName,
  shopLogo,
  description,
  isActive,
  expiryDate,
  color = "bg-gradient-to-br from-blue-500 to-blue-600",
  onClick
}) => {
  return (
    <div 
      className={`apple-card ${isActive ? 'snap-center' : 'snap-center opacity-75'} min-w-[280px] w-[80vw] max-w-sm animate-card-slide transition-all`}
      onClick={onClick}
    >
      <div className={`${color} rounded-t-2xl p-4 text-white`}>
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
              <img src={shopLogo} alt={shopName} className="h-8 w-8 object-contain" />
            </div>
            <div className="ml-3">
              <h3 className="font-bold">{shopName}</h3>
              <p className="text-xs text-white/80">Valid until {expiryDate}</p>
            </div>
          </div>
          <button className="rounded-full p-1 bg-white/10 hover:bg-white/20">
            <Info size={16} />
          </button>
        </div>
        <h2 className="text-xl font-bold mt-6">{title}</h2>
        <p className="text-sm text-white/80 mt-1">{description}</p>
      </div>
      
      <div className="bg-white p-4 rounded-b-2xl flex flex-col items-center">
        {isActive ? (
          <>
            <QRCode value={id} size={160} />
            <p className="text-xs text-gray-500 mt-3 text-center">
              Present this QR code at {shopName} to redeem
            </p>
          </>
        ) : (
          <div className="py-6 flex flex-col items-center">
            <p className="text-gray-500 mb-4 text-center">Visit shop to activate</p>
            <button className="apple-button text-sm py-2 px-4">
              View Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RewardCard;
