
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const WelcomeScreen = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-loyalt-gradient-start to-loyalt-gradient-end flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100
          }}
          className="mb-4"
        >
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 mb-3">
            <div className="w-20 h-20 bg-[#009ea3] rounded-lg flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M9 13H15" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 16C12.5523 16 13 15.5523 13 15C13 14.4477 12.5523 14 12 14C11.4477 14 11 14.4477 11 15C11 15.5523 11.4477 16 12 16Z" fill="white" />
                <path d="M9.5 8.5H9.51M12.5 8.5H14.5" stroke="white" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl font-bold text-white tracking-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: showText ? 1 : 0 
          }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Loyal<span className="text-[#009ea3]">T</span>
        </motion.h1>
        
        <motion.p
          className="text-white/80 mt-2 font-medium text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: showText ? 1 : 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Loyalty made simple
        </motion.p>
      </div>
      
      <motion.div
        className="absolute bottom-16"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: showText ? 1 : 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <motion.div 
          animate={{ 
            y: [0, -8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5L12 19M12 19L18 13M12 19L6 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
