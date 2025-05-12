
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import ResetPasswordForm from '@/components/ResetPasswordForm';

type AuthView = 'login' | 'register' | 'reset-password';

const LoginPage = () => {
  const [currentView, setCurrentView] = useState<AuthView>('login');

  const switchView = (view: AuthView) => {
    setCurrentView(view);
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-gradient-to-b from-loyalt-gradient-start to-loyalt-gradient-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >      
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Logo */}
        <motion.div 
          className="my-8 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            type: "spring",
            damping: 15
          }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 mr-3">
              <div className="w-16 h-16 flex items-center justify-center">
                {/* Updated logo with heart */}
                <svg width="64" height="64" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="96" height="96" rx="24" fill="#2D5F63"/>
                  <path d="M24 36H72V32C72 28 68 24 64 24H32C28 24 24 28 24 32V36Z" fill="#C2F4E5"/>
                  <path d="M24 36H72V64C72 68 68 72 64 72H32C28 72 24 68 24 64V36Z" fill="#C2F4E5"/>
                  <path d="M48 60C53.52 60 58 55.52 58 50C58 44.48 53.52 40 48 40C42.48 40 38 44.48 38 50C38 55.52 42.48 60 48 60Z" fill="#2D5F63"/>
                  <path d="M48 57C49.5913 57 51.1174 56.3679 52.2426 55.2426C53.3679 54.1174 54 52.5913 54 51C54 49.4087 53.3679 47.8826 52.2426 46.7574C51.1174 45.6321 49.5913 45 48 45C46.4087 45 44.8826 45.6321 43.7574 46.7574C42.6321 47.8826 42 49.4087 42 51C42 52.5913 42.6321 54.1174 43.7574 55.2426C44.8826 56.3679 46.4087 57 48 57Z" fill="#C2F4E5"/>
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold font-sf-pro" style={{ fontStyle: "italic" }}>
              <span className="text-white">Loyal</span><span className="text-[#C2F4E5]">T</span>
            </h1>
          </div>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {currentView === 'login' && (
            <LoginForm 
              key="login" 
              onSwitchToRegister={() => switchView('register')}
              onForgotPassword={() => switchView('reset-password')}
            />
          )}
          
          {currentView === 'register' && (
            <RegisterForm 
              key="register"
              onSwitchToLogin={() => switchView('login')}
            />
          )}
          
          {currentView === 'reset-password' && (
            <ResetPasswordForm 
              key="reset"
              onBack={() => switchView('login')}
            />
          )}
        </AnimatePresence>
      </div>
      
      <motion.div
        className="text-center py-6 text-white/60 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        &copy; {new Date().getFullYear()} LoyalT • <a href="#" className="hover:text-white">Privacy</a> • <a href="#" className="hover:text-white">Terms</a>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
