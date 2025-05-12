
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, authService } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { 
    email: string; 
    password: string; 
    name: string; 
    role: 'client' | 'vendor' 
  }) => Promise<void>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing user session
    const checkAuthState = () => {
      setIsLoading(true);
      try {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error checking auth state', error);
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const loggedInUser = await authService.login(email, password);
      setUser(loggedInUser);
      toast.success(`Welcome back, ${loggedInUser?.name || 'User'}`);
      
      // Route based on user role
      if (loggedInUser?.role === 'vendor') {
        navigate('/vendor/dashboard');
      } else {
        navigate('/rewards');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: { email: string; password: string; name: string; role: 'client' | 'vendor' }) => {
    setIsLoading(true);
    try {
      const newUser = await authService.register(userData);
      setUser(newUser);
      toast.success('Account created successfully!');
      
      // Route based on user role
      if (newUser.role === 'vendor') {
        navigate('/vendor/dashboard');
      } else {
        navigate('/rewards');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    toast.info('You have been logged out');
    navigate('/login');
  };

  const requestPasswordReset = async (email: string) => {
    setIsLoading(true);
    try {
      await authService.requestPasswordReset(email);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send reset link');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    requestPasswordReset,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
