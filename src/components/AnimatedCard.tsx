
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
}

const AnimatedCard = ({ children, className = "", onClick, delay = 0 }: AnimatedCardProps) => {
  return (
    <motion.div
      className={`bg-white rounded-xl shadow-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        delay 
      }}
      whileHover={{ 
        y: -5, 
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
        scale: 1.02
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
