
import { createClient } from '@supabase/supabase-js';

// Get environment variables for Supabase
// In a real app, these would be environment variables
// For this demo, we'll use placeholder values that would be replaced when connected to Supabase
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-anon-key';

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types based on our schema
export type Profile = {
  id: string;
  user_id: string;
  name: string;
  role: 'client' | 'vendor';
  points: number;
  membership_level: 'standard' | 'silver' | 'gold' | 'platinum';
  created_at: string;
  updated_at: string;
};

export type Shop = {
  id: string;
  owner_id: string;
  name: string;
  description: string;
  logo_url: string;
  category: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  rating: number;
  created_at: string;
};

export type Reward = {
  id: string;
  shop_id: string;
  title: string;
  description: string;
  points_required: number;
  expiry_date: string;
  is_active: boolean;
  color_scheme: string;
  created_at: string;
};

export type UserReward = {
  id: string;
  user_id: string;
  reward_id: string;
  shop_id: string;
  acquired_date: string;
  expiry_date: string;
  redeemed: boolean;
  redeemed_date: string | null;
};

export type Transaction = {
  id: string;
  user_id: string;
  shop_id: string;
  points: number;
  type: 'earn' | 'redeem';
  description: string;
  created_at: string;
};

export type QrCode = {
  id: string;
  shop_id: string;
  points_value: number;
  description: string;
  expiry_date: string;
  is_single_use: boolean;
  created_at: string;
};

// Database service functions
export const dbService = {
  // User profiles
  profiles: {
    getById: async (userId: string) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
        
      if (error) throw error;
      return data as Profile;
    },
    
    update: async (userId: string, updates: Partial<Profile>) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', userId)
        .select()
        .single();
        
      if (error) throw error;
      return data as Profile;
    },
  },
  
  // Shops
  shops: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('shops')
        .select('*');
        
      if (error) throw error;
      return data as Shop[];
    },
    
    getById: async (shopId: string) => {
      const { data, error } = await supabase
        .from('shops')
        .select('*')
        .eq('id', shopId)
        .single();
        
      if (error) throw error;
      return data as Shop;
    },
    
    getByOwner: async (ownerId: string) => {
      const { data, error } = await supabase
        .from('shops')
        .select('*')
        .eq('owner_id', ownerId);
        
      if (error) throw error;
      return data as Shop[];
    },
  },
  
  // Rewards
  rewards: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('rewards')
        .select('*');
        
      if (error) throw error;
      return data as Reward[];
    },
    
    getByShop: async (shopId: string) => {
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .eq('shop_id', shopId);
        
      if (error) throw error;
      return data as Reward[];
    },
  },
  
  // User rewards
  userRewards: {
    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('user_rewards')
        .select('*, rewards(*), shops(*)')
        .eq('user_id', userId);
        
      if (error) throw error;
      return data;
    },
    
    addReward: async (userReward: Omit<UserReward, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('user_rewards')
        .insert(userReward)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    
    redeemReward: async (rewardId: string, userId: string) => {
      const { data, error } = await supabase
        .from('user_rewards')
        .update({
          redeemed: true,
          redeemed_date: new Date().toISOString()
        })
        .match({ reward_id: rewardId, user_id: userId })
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
  },
  
  // Transactions
  transactions: {
    getByUser: async (userId: string) => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*, shops(*)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data;
    },
    
    addTransaction: async (transaction: Omit<Transaction, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('transactions')
        .insert(transaction)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
  },
  
  // QR Codes
  qrCodes: {
    getByShop: async (shopId: string) => {
      const { data, error } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('shop_id', shopId);
        
      if (error) throw error;
      return data as QrCode[];
    },
    
    validateQrCode: async (qrCodeId: string) => {
      const { data, error } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('id', qrCodeId)
        .single();
        
      if (error) throw error;
      return data as QrCode;
    },
    
    createQrCode: async (qrCode: Omit<QrCode, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('qr_codes')
        .insert(qrCode)
        .select()
        .single();
        
      if (error) throw error;
      return data as QrCode;
    },
  }
};
