
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

interface ResetPasswordFormProps {
  onBack: () => void;
}

const ResetPasswordForm = ({ onBack }: ResetPasswordFormProps) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const { requestPasswordReset, isLoading } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await requestPasswordReset(email);
      setSubmitted(true);
    } catch (error) {
      // Error handled in useAuth
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-md"
    >
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
        <p className="text-white/80">
          {submitted 
            ? "Check your email for a reset link" 
            : "Enter your email and we'll send you a link to reset your password"}
        </p>
      </motion.div>

      {!submitted ? (
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-4"
        >
          <motion.div 
            className="relative"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
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
          
          <motion.div 
            className="flex space-x-4 pt-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1 py-6 bg-white/20 text-white border-0 rounded-full"
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-6 bg-white text-[#009ea3] rounded-full font-medium"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-[#009ea3] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </motion.div>
        </motion.form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="bg-white/20 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-white mb-6">
            We've sent an email to <span className="font-semibold">{email}</span> with a link to reset your password.
          </p>
          <Button
            onClick={onBack}
            className="w-full py-6 bg-white text-[#009ea3] rounded-full font-medium"
          >
            Back to Login
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResetPasswordForm;
