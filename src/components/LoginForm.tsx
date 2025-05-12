
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onForgotPassword: () => void;
}

const LoginForm = ({ onSwitchToRegister, onForgotPassword }: LoginFormProps) => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'client' | 'vendor'>('client');
  const [showSsoDialog, setShowSsoDialog] = useState(false);
  const [ssoType, setSsoType] = useState<'apple' | 'google' | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await login(email, password);
    } catch (error) {
      // Error is handled in useAuth
    }
  };

  const handleSsoLogin = (type: 'apple' | 'google') => {
    setSsoType(type);
    setShowSsoDialog(true);
    
    // Simulate SSO login process
    setTimeout(() => {
      setShowSsoDialog(false);
      
      // Use demo account credentials based on SSO type
      if (type === 'apple') {
        login('emma@example.com', 'password');
      } else {
        login('vendor@example.com', 'password');
      }
    }, 1500);
  };
  
  return (
    <>
      <motion.form 
        onSubmit={handleLogin} 
        className="w-full max-w-md space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
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
        
        {/* Apple Sign in */}
        <motion.button 
          type="button"
          className="w-full bg-white text-black rounded-full py-3 px-4 flex items-center justify-center font-medium space-x-2 shadow-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSsoLogin('apple')}
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
          onClick={() => handleSsoLogin('google')}
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
          </svg>
          <span>Sign in with Google</span>
        </motion.button>
        
        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-white/20"></div>
          <span className="flex-shrink mx-4 text-white/60 text-sm">or</span>
          <div className="flex-grow border-t border-white/20"></div>
        </div>
        
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
          {errors.email && <p className="text-red-400 text-xs mt-1 ml-4">{errors.email}</p>}
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
          {errors.password && <p className="text-red-400 text-xs mt-1 ml-4">{errors.password}</p>}
        </motion.div>
        
        {/* Login Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-[#009ea3] text-white font-semibold text-lg rounded-full hover:bg-opacity-90 transition-all flex justify-center items-center"
          whileHover={{ scale: 1.02, boxShadow: "0px 5px 15px rgba(0, 158, 163, 0.3)" }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            userType === 'vendor' ? 'Access Business Portal' : 'Get Started'
          )}
        </motion.button>
        
        {/* Forgot Password Link */}
        <motion.div 
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <button 
            type="button" 
            onClick={onForgotPassword}
            className="text-white text-sm hover:underline"
          >
            Forgot password?
          </button>
        </motion.div>
        
        {/* Sign Up Link */}
        <motion.div 
          className="text-center mt-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          <p className="text-white">
            Don't have an account? <button type="button" onClick={onSwitchToRegister} className="font-semibold">Sign up</button>
          </p>
        </motion.div>
      </motion.form>

      {/* SSO Login Dialog */}
      <Dialog open={showSsoDialog} onOpenChange={setShowSsoDialog}>
        <DialogContent className="sm:max-w-md p-6 rounded-3xl">
          <div className="flex flex-col items-center">
            <div className="animate-pulse mb-4">
              {ssoType === 'apple' ? (
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                  <path d="M17.0919 12.8228C17.0799 10.9348 18.6039 9.9088 18.6559 9.8768C17.6759 8.4368 16.1579 8.2308 15.6119 8.2128C14.3279 8.0848 13.0919 8.9928 12.4399 8.9928C11.7719 8.9928 10.7679 8.2248 9.6839 8.2488C8.2959 8.2728 7.0079 9.0368 6.3159 10.2168C4.8839 12.6168 5.9599 16.1408 7.3399 18.0108C8.0279 18.9228 8.8319 19.9468 9.8719 19.9028C10.8799 19.8588 11.2479 19.2368 12.4639 19.2368C13.6639 19.2368 14.0079 19.9028 15.0639 19.8768C16.1559 19.8588 16.8519 18.9468 17.5159 18.0228C18.2999 16.9628 18.6199 15.9268 18.6319 15.8828C18.6079 15.8708 17.1039 15.2848 17.0919 12.8228Z" fill="black"/>
                  <path d="M15.3839 6.8528C15.9399 6.1648 16.3079 5.2168 16.1999 4.2488C15.3959 4.2848 14.3679 4.8048 13.7879 5.4688C13.2799 6.0528 12.8399 7.0488 12.9599 7.9728C13.8719 8.0548 14.8039 7.5288 15.3839 6.8528Z" fill="black"/>
                </svg>
              ) : (
                <svg className="w-12 h-12" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                </svg>
              )}
            </div>
            <h2 className="text-xl font-semibold mb-2">Signing in with {ssoType === 'apple' ? 'Apple' : 'Google'}</h2>
            <p className="text-sm text-gray-500">Please wait while we log you in...</p>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-loyalt-primary h-1.5 rounded-full animate-pulse-slow" style={{width: '60%'}}></div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginForm;
