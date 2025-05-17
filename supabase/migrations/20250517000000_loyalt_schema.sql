
-- Create Schema for LoyalT App

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('client', 'vendor')),
  points INTEGER NOT NULL DEFAULT 0,
  membership_level TEXT NOT NULL DEFAULT 'standard' CHECK (membership_level IN ('standard', 'silver', 'gold', 'platinum')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create shops table
CREATE TABLE IF NOT EXISTS shops (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  category TEXT,
  location JSONB,
  address TEXT,
  rating NUMERIC(3,1),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create rewards table
CREATE TABLE IF NOT EXISTS rewards (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  shop_id uuid REFERENCES shops ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  points_required INTEGER NOT NULL DEFAULT 0,
  expiry_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  color_scheme TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create user_rewards table
CREATE TABLE IF NOT EXISTS user_rewards (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  reward_id uuid REFERENCES rewards ON DELETE CASCADE NOT NULL,
  shop_id uuid REFERENCES shops ON DELETE CASCADE NOT NULL,
  acquired_date TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  expiry_date TIMESTAMP WITH TIME ZONE NOT NULL,
  redeemed BOOLEAN NOT NULL DEFAULT FALSE,
  redeemed_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE (user_id, reward_id)
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  shop_id uuid REFERENCES shops ON DELETE CASCADE NOT NULL,
  points INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('earn', 'redeem')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create qr_codes table
CREATE TABLE IF NOT EXISTS qr_codes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  shop_id uuid REFERENCES shops ON DELETE CASCADE NOT NULL,
  points_value INTEGER NOT NULL DEFAULT 10,
  description TEXT,
  expiry_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_single_use BOOLEAN NOT NULL DEFAULT FALSE,
  used_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create loyalty_programs table
CREATE TABLE IF NOT EXISTS loyalty_programs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  shop_id uuid REFERENCES shops ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  points_per_visit INTEGER NOT NULL DEFAULT 10,
  reward_threshold INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Row Level Security Policies

-- Profiles: Users can read any profile but only update their own
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" 
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE USING (auth.uid() = user_id);

-- Shops: Owners can CRUD their shops, others can read
ALTER TABLE shops ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Shops are viewable by everyone" 
  ON shops FOR SELECT USING (true);

CREATE POLICY "Shop owners can insert their shops" 
  ON shops FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Shop owners can update their shops" 
  ON shops FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Shop owners can delete their shops" 
  ON shops FOR DELETE USING (auth.uid() = owner_id);

-- Rewards: Shop owners can CRUD their rewards, others can read
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Rewards are viewable by everyone" 
  ON rewards FOR SELECT USING (true);

CREATE POLICY "Shop owners can insert rewards" 
  ON rewards FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT owner_id FROM shops WHERE id = shop_id)
  );

CREATE POLICY "Shop owners can update rewards" 
  ON rewards FOR UPDATE USING (
    auth.uid() IN (SELECT owner_id FROM shops WHERE id = shop_id)
  );

CREATE POLICY "Shop owners can delete rewards" 
  ON rewards FOR DELETE USING (
    auth.uid() IN (SELECT owner_id FROM shops WHERE id = shop_id)
  );

-- User Rewards: Users can see their rewards, shop owners can see rewards for their shop
ALTER TABLE user_rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own rewards" 
  ON user_rewards FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Shop owners can view rewards for their shops" 
  ON user_rewards FOR SELECT USING (
    auth.uid() IN (SELECT owner_id FROM shops WHERE id = shop_id)
  );

CREATE POLICY "Users can redeem their rewards" 
  ON user_rewards FOR UPDATE USING (auth.uid() = user_id);

-- Transactions: Users can see their transactions, shop owners can see transactions for their shop
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own transactions" 
  ON transactions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Shop owners can view transactions for their shops" 
  ON transactions FOR SELECT USING (
    auth.uid() IN (SELECT owner_id FROM shops WHERE id = shop_id)
  );

-- QR Codes: Shop owners can CRUD their QR codes
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Shop owners can view their QR codes" 
  ON qr_codes FOR SELECT USING (
    auth.uid() IN (SELECT owner_id FROM shops WHERE id = shop_id)
  );

CREATE POLICY "Shop owners can insert QR codes" 
  ON qr_codes FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT owner_id FROM shops WHERE id = shop_id)
  );

CREATE POLICY "Shop owners can update QR codes" 
  ON qr_codes FOR UPDATE USING (
    auth.uid() IN (SELECT owner_id FROM shops WHERE id = shop_id)
  );

CREATE POLICY "Shop owners can delete QR codes" 
  ON qr_codes FOR DELETE USING (
    auth.uid() IN (SELECT owner_id FROM shops WHERE id = shop_id)
  );

-- Loyalty Programs: Shop owners can CRUD their programs
ALTER TABLE loyalty_programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Loyalty programs are viewable by everyone" 
  ON loyalty_programs FOR SELECT USING (true);

CREATE POLICY "Shop owners can insert programs" 
  ON loyalty_programs FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT owner_id FROM shops WHERE id = shop_id)
  );

CREATE POLICY "Shop owners can update programs" 
  ON loyalty_programs FOR UPDATE USING (
    auth.uid() IN (SELECT owner_id FROM shops WHERE id = shop_id)
  );

CREATE POLICY "Shop owners can delete programs" 
  ON loyalty_programs FOR DELETE USING (
    auth.uid() IN (SELECT owner_id FROM shops WHERE id = shop_id)
  );

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, role)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'name', 
    new.raw_user_meta_data->>'role'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create function to update profile timestamps
CREATE OR REPLACE FUNCTION public.update_timestamp() 
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for updating timestamps
CREATE TRIGGER update_profiles_timestamp
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER update_shops_timestamp
  BEFORE UPDATE ON shops
  FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER update_rewards_timestamp
  BEFORE UPDATE ON rewards
  FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER update_qr_codes_timestamp
  BEFORE UPDATE ON qr_codes
  FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER update_loyalty_programs_timestamp
  BEFORE UPDATE ON loyalty_programs
  FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
