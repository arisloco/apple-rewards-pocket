
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, authService } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { supabase } from '@/lib/supabase';

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
  updateProfile: (profileData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing user session
    const checkAuthState = async () => {
      setIsLoading(true);
      try {
        // Check Supabase session first if available
        if (supabase && supabase.auth) {
          const { data } = await supabase.auth.getSession();
          
          if (data.session) {
            // Session exists, get user data
            const { data: userData } = await supabase.auth.getUser();
            
            if (userData.user) {
              // Get profile data
              const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', userData.user.id)
                .single();
                
              if (profileData) {
                // User exists in Supabase
                const user: User = {
                  id: userData.user.id,
                  email: userData.user.email!,
                  name: profileData.name,
                  role: profileData.role,
                  points: profileData.points,
                  membershipLevel: profileData.membership_level,
                  createdAt: profileData.created_at
                };
                
                setUser(user);
              }
            }
          } else {
            // Fallback to localStorage for demo
            const currentUser = authService.getCurrentUser();
            setUser(currentUser);
          }
        } else {
          // Fallback to localStorage for demo
          const currentUser = authService.getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error checking auth state', error);
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
    
    // Set up Supabase auth listener
    if (supabase && supabase.auth) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_IN' && session) {
            // Get user profile from database
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('user_id', session.user.id)
              .single();
              
            if (profileData) {
              const user: User = {
                id: session.user.id,
                email: session.user.email!,
                name: profileData.name,
                role: profileData.role,
                points: profileData.points,
                membershipLevel: profileData.membership_level,
                createdAt: profileData.created_at
              };
              
              setUser(user);
            }
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
          }
        }
      );
      
      // Cleanup subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    }
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
      toast.success(`Password reset link sent to ${email}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send reset link');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<User>) => {
    if (!user) throw new Error('No user is logged in');
    
    setIsLoading(true);
    try {
      // Update profile using authService
      const updatedUser = await authService.updateProfile(user.id, profileData);
      setUser(updatedUser);
      toast.success('Profile updated successfully');
      return updatedUser;
    } catch (error) {
      toast.error('Failed to update profile');
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
    isLoading,
    updateProfile
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
