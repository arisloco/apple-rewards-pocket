
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const { register, isLoading } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'client' | 'vendor'>('client');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name) newErrors.name = 'Name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await register({ 
        name, 
        email, 
        password,
        role: userType
      });
    } catch (error) {
      // Error is handled in useAuth
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="w-full max-w-md space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="w-full max-w-md mb-6">
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
      
      {/* Name Input */}
      <motion.div 
        className="relative"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <Input
          type="text"
          placeholder="Full Name"
          className="bg-white/90 backdrop-blur-sm border-0 rounded-full px-6 py-6 text-[#009ea3] text-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {errors.name && <p className="text-red-400 text-xs mt-1 ml-4">{errors.name}</p>}
      </motion.div>
      
      {/* Email Input */}
      <motion.div 
        className="relative"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
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
        transition={{ delay: 0.3, duration: 0.3 }}
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
      
      {/* Confirm Password Input */}
      <motion.div 
        className="relative"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          className="bg-white/90 backdrop-blur-sm border-0 rounded-full px-6 py-6 text-[#009ea3] text-lg"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {errors.confirmPassword && <p className="text-red-400 text-xs mt-1 ml-4">{errors.confirmPassword}</p>}
      </motion.div>
      
      {/* Register Button */}
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
          `Create ${userType === 'vendor' ? 'Business' : ''} Account`
        )}
      </motion.button>
      
      {/* Login Link */}
      <motion.div 
        className="text-center mt-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
      >
        <p className="text-white">
          Already have an account? <button type="button" onClick={onSwitchToLogin} className="font-semibold">Sign in</button>
        </p>
      </motion.div>
    </motion.form>
  );
};

export default RegisterForm;
