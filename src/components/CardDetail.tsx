
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from 'lucide-react';
import QRCode from './QRCode';
import type { RewardCardProps } from './RewardCard';
import { motion, AnimatePresence } from 'framer-motion';

interface CardDetailProps extends RewardCardProps {
  open: boolean;
  onClose: () => void;
}

const CardDetail: React.FC<CardDetailProps> = ({
  id,
  title,
  shopName,
  shopLogo,
  description,
  isActive,
  expiryDate,
  color = "bg-gradient-to-br from-blue-500 to-blue-600",
  open,
  onClose
}) => {
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-3xl border-none">
        <DialogHeader className={`${color} p-4 text-white rounded-t-3xl`}>
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                <img src={shopLogo} alt={shopName} className="h-10 w-10 object-contain" />
              </div>
              <div className="ml-3">
                <DialogTitle className="text-white">{shopName}</DialogTitle>
                <p className="text-xs text-white/80">Valid until {expiryDate}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="rounded-full p-1.5 bg-white/10 hover:bg-white/20"
            >
              <X size={18} />
            </button>
          </div>
          <h2 className="text-xl font-bold mt-6">{title}</h2>
          <p className="text-sm text-white/90 mt-1">{description}</p>
        </DialogHeader>
        
        <div className="p-6 rounded-b-3xl bg-white">
          {isActive ? (
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <QRCode value={id} size={200} />
              <p className="text-sm text-gray-700 mt-4">
                Present this QR code at {shopName} to redeem your reward.
              </p>
            </motion.div>
          ) : (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-700 mb-4">
                This reward is not activated yet. Visit {shopName} to activate it.
              </p>
              <button className="bg-[#009ea3] text-white font-medium py-2.5 px-5 rounded-full hover:bg-opacity-90 transition-all">
                Get Directions
              </button>
            </motion.div>
          )}
          
          <motion.div 
            className="mt-8 border-t border-gray-200 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <h3 className="font-bold text-lg mb-2">Terms & Conditions</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Valid for one-time use only</li>
              <li>• Cannot be combined with other offers</li>
              <li>• No cash value</li>
              <li>• Expires on {expiryDate}</li>
            </ul>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardDetail;
