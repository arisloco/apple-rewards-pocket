
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'client' | 'vendor'>('client');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
    // Route based on user type
    if (userType === 'vendor') {
      navigate('/vendor/dashboard');
    } else {
      navigate('/rewards');
    }
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
              <div className="w-12 h-12 bg-[#009ea3] rounded-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M9 13H15" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 16C12.5523 16 13 15.5523 13 15C13 14.4477 12.5523 14 12 14C11.4477 14 11 14.4477 11 15C11 15.5523 11.4477 16 12 16Z" fill="white" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-[#009ea3]">Loyal<span className="text-white">T</span></h1>
          </div>
        </motion.div>
        
        {/* User Type Selection */}
        <motion.div 
          className="w-full max-w-md mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-full flex p-1">
            <button
              type="button"
              onClick={() => setUserType('client')}
              className={`flex-1 py-3 rounded-full transition-all ${
                userType === 'client' 
                  ? 'bg-white text-[#009ea3] font-medium shadow-sm' 
                  : 'text-white/80'
              }`}
            >
              Client
            </button>
            <button
              type="button"
              onClick={() => setUserType('vendor')}
              className={`flex-1 py-3 rounded-full transition-all ${
                userType === 'vendor' 
                  ? 'bg-white text-[#009ea3] font-medium shadow-sm' 
                  : 'text-white/80'
              }`}
            >
              Business
            </button>
          </div>
        </motion.div>
        
        {/* Login form */}
        <motion.form 
          onSubmit={handleLogin} 
          className="w-full max-w-md space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Apple Sign in */}
          <motion.button 
            type="button"
            className="w-full bg-white text-black rounded-full py-3 px-4 flex items-center justify-center font-medium space-x-2 shadow-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => console.log("Apple login")}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M17.0919 12.8228C17.0799 10.9348 18.6039 9.9088 18.6559 9.8768C17.6759 8.4368 16.1579 8.2308 15.6119 8.2128C14.3279 8.0848 13.0919 8.9928 12.4399 8.9928C11.7719 8.9928 10.7679 8.2248 9.6839 8.2488C8.2959 8.2728 7.0079 9.0368 6.3159 10.2168C4.8839 12.6168 5.9599 16.1408 7.3399 18.0108C8.0279 18.9228 8.8319 19.9468 9.8719 19.9028C10.8799 19.8588 11.2479 19.2368 12.4639 19.2368C13.6639 19.2368 14.0079 19.9028 15.0639 19.8768C16.1559 19.8588 16.8519 18.9468 17.5159 18.0228C18.2999 16.9628 18.6199 15.9268 18.6319 15.8828C18.6079 15.8708 17.1039 15.2848 17.0919 12.8228Z" fill="black"/>
              <path d="M15.3839 6.8528C15.9399 6.1648 16.3079 5.2168 16.1999 4.2488C15.3959 4.2848 14.3679 4.8048 13.7879 5.4688C13.2799 6.0528 12.8399 7.0488 12.9599 7.9728C13.8719 8.0548 14.8039 7.5288 15.3839 6.8528Z" fill="black"/>
            </svg>
            <span>Sign in with Apple</span>
          </motion.button>
          
          {/* Google Sign in */}
          <motion.button
            type="button"
            className="w-full bg-white text-black rounded-full py-3 px-4 flex items-center justify-center font-medium space-x-2 shadow-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => console.log("Google login")}
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            <span>Sign in with Google</span>
          </motion.button>
          
          {/* Email Input */}
          <motion.div 
            className="relative"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <Input
              type="email"
              placeholder="Email"
              className="bg-white/90 backdrop-blur-sm border-0 rounded-full px-6 py-6 text-[#009ea3] text-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>
          
          {/* Password Input */}
          <motion.div 
            className="relative"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-white/90 backdrop-blur-sm border-0 rounded-full px-6 py-6 text-[#009ea3] text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </motion.div>
          
          {/* Login Button */}
          <motion.button
            type="submit"
            className="w-full py-6 bg-[#009ea3] text-white font-semibold text-lg rounded-full hover:bg-opacity-90 transition-all"
            whileHover={{ scale: 1.02, boxShadow: "0px 5px 15px rgba(0, 158, 163, 0.3)" }}
            whileTap={{ scale: 0.98 }}
          >
            {userType === 'vendor' ? 'Access Business Portal' : 'Get Started'}
          </motion.button>
          
          {/* Forgot Password Link */}
          <motion.div 
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            <a href="#" className="text-white text-sm hover:underline">
              Forgot password?
            </a>
          </motion.div>
          
          {/* Sign Up Link */}
          <motion.div 
            className="text-center mt-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            <p className="text-white">
              Don't have an account? <a href="#" className="font-semibold">Sign up</a>
            </p>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default LoginPage;
