
import { toast } from "sonner";

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

// Create a mock database of users for demo purposes
// In a real app, this would be stored in a secure database
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
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find user by email (simple demo - in real app would check password hash)
    const user = demoUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Store user in localStorage (in real app, would store JWT token)
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');
    
    return user;
  },
  
  // Register function
  register: async (userData: { 
    email: string; 
    password: string; 
    name: string; 
    role: 'client' | 'vendor' 
  }): Promise<User> => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const userExists = demoUsers.some(u => 
      u.email.toLowerCase() === userData.email.toLowerCase()
    );
    
    if (userExists) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user
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
    demoUsers.push(newUser);
    
    // Store user in localStorage
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('isLoggedIn', 'true');
    
    return newUser;
  },
  
  // Logout function
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
  },
  
  // Get current user
  getCurrentUser: (): User | null => {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson) as User;
    } catch (error) {
      console.error('Error parsing user from localStorage', error);
      return null;
    }
  },
  
  // Check if user is logged in
  isAuthenticated: (): boolean => {
    return localStorage.getItem('isLoggedIn') === 'true' && !!authService.getCurrentUser();
  },
  
  // Reset password (demo)
  requestPasswordReset: async (email: string): Promise<void> => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email
    const user = demoUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      throw new Error('No account found with that email');
    }
    
    // In a real app, this would send an email with a reset link
    toast.success(`Password reset link sent to ${email}`);
  }
};
