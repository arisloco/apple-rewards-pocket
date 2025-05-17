
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

interface QRRequest {
  userId: string;
  qrData: string;
}

interface QRResponse {
  success: boolean;
  type: 'points' | 'reward' | null;
  message: string;
  data?: any;
}

serve(async (req) => {
  // Create a Supabase client with the Auth context of the logged in user
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      global: {
        headers: { Authorization: req.headers.get('Authorization')! },
      },
    }
  );

  try {
    // Parse request body
    const { userId, qrData } = await req.json() as QRRequest;
    
    // Validate request
    if (!userId || !qrData) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required fields' }),
        { headers: { 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Parse QR data (format: type:shopId:value:id[:description])
    const parts = qrData.split(':');
    if (parts.length < 4) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid QR code format' }),
        { headers: { 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    const [type, shopId, value, qrId, description] = parts;
    
    // Validate QR type
    if (type !== 'points' && type !== 'reward') {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid QR code type' }),
        { headers: { 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Check if shop exists
    const { data: shop, error: shopError } = await supabaseClient
      .from('shops')
      .select('*')
      .eq('id', shopId)
      .single();
      
    if (shopError || !shop) {
      return new Response(
        JSON.stringify({ success: false, message: 'Shop not found' }),
        { headers: { 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    let response: QRResponse;
    
    if (type === 'points') {
      // Process points QR code
      const pointsValue = parseInt(value, 10);
      
      // Add transaction record
      const { data: transaction, error: transactionError } = await supabaseClient
        .from('transactions')
        .insert({
          user_id: userId,
          shop_id: shopId,
          points: pointsValue,
          type: 'earn',
          description: description || `Earned ${pointsValue} points from ${shop.name}`
        })
        .select()
        .single();
        
      if (transactionError) {
        return new Response(
          JSON.stringify({ success: false, message: 'Failed to record transaction' }),
          { headers: { 'Content-Type': 'application/json' }, status: 500 }
        );
      }
      
      // Get current user profile
      const { data: profile, error: profileError } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
        
      if (profileError) {
        return new Response(
          JSON.stringify({ success: false, message: 'User profile not found' }),
          { headers: { 'Content-Type': 'application/json' }, status: 400 }
        );
      }
      
      // Update user points
      const newPoints = profile.points + pointsValue;
      
      // Determine membership level based on points
      let membershipLevel = profile.membership_level;
      if (newPoints >= 1000) {
        membershipLevel = 'platinum';
      } else if (newPoints >= 500) {
        membershipLevel = 'gold';
      } else if (newPoints >= 250) {
        membershipLevel = 'silver';
      }
      
      // Update profile
      const { error: updateError } = await supabaseClient
        .from('profiles')
        .update({
          points: newPoints,
          membership_level: membershipLevel
        })
        .eq('user_id', userId);
        
      if (updateError) {
        return new Response(
          JSON.stringify({ success: false, message: 'Failed to update points' }),
          { headers: { 'Content-Type': 'application/json' }, status: 500 }
        );
      }
      
      response = {
        success: true,
        type: 'points',
        message: `You earned ${pointsValue} points!`,
        data: {
          points: pointsValue,
          totalPoints: newPoints,
          membershipLevel
        }
      };
    } else if (type === 'reward') {
      // Process reward QR code
      const rewardId = qrId;
      
      // Check if reward exists
      const { data: reward, error: rewardError } = await supabaseClient
        .from('rewards')
        .select('*')
        .eq('id', rewardId)
        .single();
        
      if (rewardError || !reward) {
        return new Response(
          JSON.stringify({ success: false, message: 'Reward not found' }),
          { headers: { 'Content-Type': 'application/json' }, status: 400 }
        );
      }
      
      // Check if user already has the reward
      const { data: userReward, error: userRewardError } = await supabaseClient
        .from('user_rewards')
        .select('*')
        .eq('user_id', userId)
        .eq('reward_id', rewardId)
        .single();
        
      if (userReward) {
        if (userReward.redeemed) {
          return new Response(
            JSON.stringify({ success: false, message: 'Reward already redeemed' }),
            { headers: { 'Content-Type': 'application/json' }, status: 400 }
          );
        }
        
        // Redeem the reward
        const { error: redeemError } = await supabaseClient
          .from('user_rewards')
          .update({
            redeemed: true,
            redeemed_date: new Date().toISOString()
          })
          .eq('id', userReward.id);
          
        if (redeemError) {
          return new Response(
            JSON.stringify({ success: false, message: 'Failed to redeem reward' }),
            { headers: { 'Content-Type': 'application/json' }, status: 500 }
          );
        }
        
        response = {
          success: true,
          type: 'reward',
          message: 'Reward redeemed successfully!',
          data: {
            reward: {
              id: reward.id,
              title: reward.title,
              description: reward.description
            }
          }
        };
      } else {
        // Get user profile
        const { data: profile, error: profileError } = await supabaseClient
          .from('profiles')
          .select('*')
          .eq('user_id', userId)
          .single();
          
        if (profileError) {
          return new Response(
            JSON.stringify({ success: false, message: 'User profile not found' }),
            { headers: { 'Content-Type': 'application/json' }, status: 400 }
          );
        }
        
        // Check if user has enough points
        if (profile.points < reward.points_required) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              message: `You need ${reward.points_required} points to redeem this reward (you have ${profile.points})` 
            }),
            { headers: { 'Content-Type': 'application/json' }, status: 400 }
          );
        }
        
        // Deduct points
        const { error: pointsError } = await supabaseClient
          .from('profiles')
          .update({
            points: profile.points - reward.points_required
          })
          .eq('user_id', userId);
          
        if (pointsError) {
          return new Response(
            JSON.stringify({ success: false, message: 'Failed to deduct points' }),
            { headers: { 'Content-Type': 'application/json' }, status: 500 }
          );
        }
        
        // Add transaction record for the redemption
        const { error: transactionError } = await supabaseClient
          .from('transactions')
          .insert({
            user_id: userId,
            shop_id: reward.shop_id,
            points: -reward.points_required,
            type: 'redeem',
            description: `Redeemed reward: ${reward.title}`
          });
          
        if (transactionError) {
          return new Response(
            JSON.stringify({ success: false, message: 'Failed to record transaction' }),
            { headers: { 'Content-Type': 'application/json' }, status: 500 }
          );
        }
        
        // Add reward to user and mark as redeemed
        const { error: addRewardError } = await supabaseClient
          .from('user_rewards')
          .insert({
            user_id: userId,
            reward_id: rewardId,
            shop_id: reward.shop_id,
            acquired_date: new Date().toISOString(),
            expiry_date: reward.expiry_date,
            redeemed: true,
            redeemed_date: new Date().toISOString()
          });
          
        if (addRewardError) {
          return new Response(
            JSON.stringify({ success: false, message: 'Failed to add reward to user' }),
            { headers: { 'Content-Type': 'application/json' }, status: 500 }
          );
        }
        
        response = {
          success: true,
          type: 'reward',
          message: 'Reward redeemed successfully!',
          data: {
            reward: {
              id: reward.id,
              title: reward.title,
              description: reward.description
            },
            pointsSpent: reward.points_required,
            pointsRemaining: profile.points - reward.points_required
          }
        };
      }
    } else {
      // Shouldn't reach here due to earlier validation
      response = {
        success: false,
        type: null,
        message: 'Invalid QR code type'
      };
    }
    
    return new Response(
      JSON.stringify(response),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { headers: { 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
