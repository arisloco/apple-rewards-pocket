
import { supabase, dbService } from './supabase';
import { authService, User } from './auth';
import { toast } from 'sonner';

export interface QRScanResult {
  type: 'points' | 'reward';
  shopId: string;
  value: number;
  id: string;
  description?: string;
}

class RewardsService {
  async processQRCode(qrData: string): Promise<QRScanResult | null> {
    try {
      // QR data format: type:shopId:value:id
      // Example: points:shop123:10:qr456
      const parts = qrData.split(':');
      if (parts.length < 4) {
        toast.error('Invalid QR code format');
        return null;
      }
      
      const [type, shopId, value, id, description] = parts;
      
      if (type !== 'points' && type !== 'reward') {
        toast.error('Invalid QR code type');
        return null;
      }
      
      const result: QRScanResult = {
        type: type as 'points' | 'reward',
        shopId,
        value: parseInt(value, 10),
        id,
        description: description || undefined
      };
      
      // Process the scan result
      await this.processScanResult(result);
      
      return result;
    } catch (error) {
      console.error('Error processing QR code:', error);
      toast.error('Failed to process QR code');
      return null;
    }
  }
  
  private async processScanResult(result: QRScanResult): Promise<void> {
    const user = authService.getCurrentUser();
    if (!user) {
      toast.error('You need to be logged in');
      return;
    }
    
    try {
      if (result.type === 'points') {
        // Add points to user account
        await this.addPoints(user.id, result.shopId, result.value, result.description || 'Points earned from scan');
        toast.success(`You earned ${result.value} points!`);
      } else if (result.type === 'reward') {
        // Redeem reward
        await this.redeemReward(user.id, result.id);
        toast.success('Reward redeemed successfully!');
      }
    } catch (error) {
      console.error('Error processing scan result:', error);
      toast.error('Failed to process scan');
    }
  }
  
  async addPoints(userId: string, shopId: string, points: number, description: string): Promise<void> {
    try {
      // Add transaction
      await dbService.transactions.addTransaction({
        user_id: userId,
        shop_id: shopId,
        points,
        type: 'earn',
        description
      });
      
      // Update user profile
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        const newPoints = currentUser.points + points;
        
        // Update membership level based on points
        let membershipLevel = currentUser.membershipLevel;
        if (newPoints >= 1000) {
          membershipLevel = 'platinum';
        } else if (newPoints >= 500) {
          membershipLevel = 'gold';
        } else if (newPoints >= 250) {
          membershipLevel = 'silver';
        }
        
        // Update user profile
        const updatedUser = await authService.updateProfile(userId, {
          points: newPoints,
          membershipLevel
        });
        
        // Update local storage
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Error adding points:', error);
      throw error;
    }
  }
  
  async redeemReward(userId: string, rewardId: string): Promise<void> {
    try {
      // Get reward details
      const { data: rewardData } = await supabase
        .from('rewards')
        .select('*')
        .eq('id', rewardId)
        .single();
        
      if (!rewardData) {
        throw new Error('Reward not found');
      }
      
      // Check if user has the reward
      const { data: userReward } = await supabase
        .from('user_rewards')
        .select('*')
        .eq('user_id', userId)
        .eq('reward_id', rewardId)
        .single();
        
      if (!userReward) {
        // Check if user has enough points
        const currentUser = authService.getCurrentUser();
        if (!currentUser) throw new Error('User not found');
        
        if (currentUser.points < rewardData.points_required) {
          throw new Error(`You need ${rewardData.points_required} points to redeem this reward`);
        }
        
        // Deduct points
        await this.addPoints(
          userId, 
          rewardData.shop_id, 
          -rewardData.points_required, 
          `Redeemed reward: ${rewardData.title}`
        );
        
        // Add reward to user
        await dbService.userRewards.addReward({
          user_id: userId,
          reward_id: rewardId,
          shop_id: rewardData.shop_id,
          acquired_date: new Date().toISOString(),
          expiry_date: rewardData.expiry_date,
          redeemed: true,
          redeemed_date: new Date().toISOString()
        });
      } else if (!userReward.redeemed) {
        // Mark as redeemed
        await dbService.userRewards.redeemReward(rewardId, userId);
      } else {
        throw new Error('Reward already redeemed');
      }
    } catch (error) {
      console.error('Error redeeming reward:', error);
      throw error;
    }
  }
  
  async getUserRewards(userId: string, filterType: 'active' | 'available' | 'expired' = 'active'): Promise<any[]> {
    try {
      const now = new Date().toISOString();
      
      if (filterType === 'active') {
        // Get active rewards (acquired but not expired or redeemed)
        const { data, error } = await supabase
          .from('user_rewards')
          .select('*, rewards(*), shops(*)')
          .eq('user_id', userId)
          .eq('redeemed', false)
          .gte('expiry_date', now);
          
        if (error) throw error;
        return data || [];
      } else if (filterType === 'available') {
        // Get available rewards (not acquired yet)
        const { data: allRewards, error: rewardsError } = await supabase
          .from('rewards')
          .select('*, shops(*)')
          .gte('expiry_date', now)
          .eq('is_active', true);
          
        if (rewardsError) throw rewardsError;
        
        // Get user's already acquired rewards
        const { data: userRewards, error: userRewardsError } = await supabase
          .from('user_rewards')
          .select('reward_id')
          .eq('user_id', userId);
          
        if (userRewardsError) throw userRewardsError;
        
        // Filter out already acquired rewards
        const acquiredRewardIds = userRewards?.map(r => r.reward_id) || [];
        return (allRewards || []).filter(reward => !acquiredRewardIds.includes(reward.id));
      } else if (filterType === 'expired') {
        // Get expired rewards
        const { data, error } = await supabase
          .from('user_rewards')
          .select('*, rewards(*), shops(*)')
          .eq('user_id', userId)
          .or(`expiry_date.lt.${now},redeemed.eq.true`);
          
        if (error) throw error;
        return data || [];
      }
      
      return [];
    } catch (error) {
      console.error('Error getting user rewards:', error);
      throw error;
    }
  }
}

export const rewardsService = new RewardsService();
