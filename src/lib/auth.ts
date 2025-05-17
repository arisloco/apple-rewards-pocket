import { toast } from "sonner";
import { createClient } from '@supabase/supabase-js';
import { supabase } from './supabase';

// User type definition
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'vendor';
  points: number;
  membershipLevel: 'standard' | 'silver' | 'gold' | 'platinum';
  createdAt: string;
}

// Demo users for development/testing
const demoUsers: User[] = [
  {
    id: '1',
    email: 'emma@example.com',
    name: 'Emma Johnson',
    role: 'client',
    points: 248,
    membershipLevel: 'gold',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    email: 'vendor@example.com',
    name: 'Urban Brew',
    role: 'vendor',
    points: 0,
    membershipLevel: 'standard',
    createdAt: '2024-02-10T14:20:00Z'
  },
];

// Auth service for handling authentication
export const authService = {
  // Login function
  login: async (email: string, password: string): Promise<User | null> => {
    try {
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Get user profile data
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', data.user.id)
        .single();
      
      if (!profile) throw new Error('Profile not found');
      
      // Transform to app's user format
      const user: User = {
        id: data.user.id,
        email: data.user.email!,
        name: profile.name,
        role: profile.role,
        points: profile.points,
        membershipLevel: profile.membership_level,
        createdAt: profile.created_at
      };
      
      return user;
    } catch (error) {
      console.error('Login error:', error);
      
      // For development/demo, fall back to demo users when Supabase isn't connected
      // This ensures the app works without a real Supabase connection
      const user = demoUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      // Store user in localStorage (in real app, would store JWT token)
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');
      
      return user;
    }
  },
  
  // Register function
  register: async (userData: { 
    email: string; 
    password: string; 
    name: string; 
    role: 'client' | 'vendor' 
  }): Promise<User> => {
    try {
      // Register with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            role: userData.role,
          }
        }
      });
      
      if (error) throw error;
      if (!data.user) throw new Error('Registration failed');
      
      // Create profile in database
      const profileData = {
        user_id: data.user.id,
        name: userData.name,
        role: userData.role,
        points: 0,
        membership_level: 'standard' as const
      };
      
      const { error: profileError } = await supabase
        .from('profiles')
        .insert(profileData);
      
      if (profileError) throw profileError;
      
      // Return user object
      const user: User = {
        id: data.user.id,
        email: data.user.email!,
        name: userData.name,
        role: userData.role,
        points: 0,
        membershipLevel: 'standard',
        createdAt: new Date().toISOString()
      };
      
      return user;
    } catch (error) {
      console.error('Register error:', error);
      
      // For development/demo when Supabase isn't connected
      if (!supabase || !supabase.auth) {
        // Create new user for demo
        const newUser: User = {
          id: `user-${Date.now().toString(36)}`,
          email: userData.email,
          name: userData.name,
          role: userData.role,
          points: 0,
          membershipLevel: 'standard',
          createdAt: new Date().toISOString()
        };
        
        // In a real app, would add user to database
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('isLoggedIn', 'true');
        
        return newUser;
      }
      
      throw error;
    }
  },
  
  // Logout function
  logout: () => {
    // Sign out from Supabase
    if (supabase && supabase.auth) {
      supabase.auth.signOut();
    }
    
    // Also clear local storage
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
  },
  
  // Get current user
  getCurrentUser: (): User | null => {
    try {
      // In a real implementation with Supabase, we would get the current user from the session
      // This would be replaced with the actual implementation when connected to Supabase
      
      // For now, use local storage
      const userJson = localStorage.getItem('user');
      if (!userJson) return null;
      
      return JSON.parse(userJson) as User;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },
  
  // Check if user is logged in
  isAuthenticated: (): boolean => {
    if (supabase && supabase.auth) {
      // In a real implementation, we would check the session
      return !!supabase.auth.getSession();
    }
    
    // For now, use local storage
    return localStorage.getItem('isLoggedIn') === 'true' && !!authService.getCurrentUser();
  },
  
  // Reset password
  requestPasswordReset: async (email: string): Promise<void> => {
    try {
      // Reset password with Supabase
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      
      toast.success(`Password reset link sent to ${email}`);
    } catch (error) {
      console.error('Password reset error:', error);
      
      // For development/demo when Supabase isn't connected
      if (!supabase || !supabase.auth) {
        // Simulate API request delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success(`Password reset link sent to ${email}`);
      } else {
        throw error;
      }
    }
  },
  
  // Update user profile
  updateProfile: async (userId: string, profileData: Partial<User>): Promise<User> => {
    try {
      // Update profile in Supabase
      if (supabase) {
        // Map to database format
        const dbProfileData: any = {};
        
        if ('name' in profileData) dbProfileData.name = profileData.name;
        if ('points' in profileData) dbProfileData.points = profileData.points;
        if ('membershipLevel' in profileData) dbProfileData.membership_level = profileData.membershipLevel;
        
        const { data, error } = await supabase
          .from('profiles')
          .update(dbProfileData)
          .eq('user_id', userId)
          .select()
          .single();
          
        if (error) throw error;
        
        // Transform to app user format
        const updatedUser: User = {
          id: userId,
          email: profileData.email || '', // We should have the email already
          name: data.name,
          role: data.role,
          points: data.points,
          membershipLevel: data.membership_level,
          createdAt: data.created_at
        };
        
        return updatedUser;
      }
      
      // Fallback for development/demo
      const currentUser = authService.getCurrentUser();
      if (!currentUser) throw new Error('No user is logged in');
      
      const updatedUser = { ...currentUser, ...profileData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }
};
