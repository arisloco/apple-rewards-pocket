
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
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 mb-3">
            <div className="w-24 h-24 flex items-center justify-center">
              <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="96" height="96" rx="24" fill="#2D5F63"/>
                <path d="M24 36H72V32C72 28 68 24 64 24H32C28 24 24 28 24 32V36Z" fill="#C2F4E5"/>
                <path d="M24 36H72V64C72 68 68 72 64 72H32C28 72 24 68 24 64V36Z" fill="#C2F4E5"/>
                <path d="M53 58C55.2091 58 57 56.2091 57 54C57 51.7909 55.2091 50 53 50C50.7909 50 49 51.7909 49 54C49 56.2091 50.7909 58 53 58Z" fill="#2D5F63"/>
                <path d="M47 58L43 54L47 50" fill="#2D5F63"/>
                <path d="M59 50L63 54L59 58" fill="#2D5F63"/>
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl font-bold text-white tracking-tight font-sf-pro"
          initial={{ y: 20, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: showText ? 1 : 0 
          }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Loyal<span className="text-[#C2F4E5]">T</span>
        </motion.h1>
        
        <motion.p
          className="text-white/80 mt-2 font-medium text-lg font-sf-pro"
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
