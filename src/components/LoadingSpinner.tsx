
import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  showText?: boolean;
  text?: string;
}

const LoadingSpinner = ({
  size = 'medium',
  color = '#009ea3',
  showText = true,
  text = 'Loading...'
}: LoadingSpinnerProps) => {
  const sizeMap = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-16 w-16'
  };

  const spinnerSize = sizeMap[size];
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <motion.div
          className={`rounded-full border-2 border-t-transparent ${spinnerSize}`}
          style={{ borderColor: `${color}40`, borderTopColor: 'transparent' }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className={`rounded-full border-2 border-l-transparent border-r-transparent absolute top-0 left-0 ${spinnerSize}`}
          style={{ borderColor: color, borderLeftColor: 'transparent', borderRightColor: 'transparent' }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      {showText && (
        <p className="mt-3 text-sm font-medium" style={{ color }}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
