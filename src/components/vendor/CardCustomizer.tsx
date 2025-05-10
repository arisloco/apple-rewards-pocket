
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Palette, Image, Edit } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const CARD_TYPES = [
  { id: 'stamp', name: 'Stamp Card', description: 'Buy X get 1 free' },
  { id: 'points', name: 'Points Card', description: 'Earn points with purchases' },
  { id: 'tier', name: 'Tier Card', description: 'Progress through loyalty tiers' },
  { id: 'visit', name: 'Visit Card', description: 'Rewards based on visit frequency' },
];

const COLOR_PRESETS = [
  '#009ea3', // Teal (loyalT primary)
  '#73e5c5', // Mint green
  '#3b82f6', // Blue
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#f97316', // Orange
  '#10b981', // Green
  '#ef4444', // Red
];

const CardCustomizer = () => {
  const [businessName, setBusinessName] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#009ea3');
  const [logo, setLogo] = useState<string | null>(null);
  const [selectedCardType, setSelectedCardType] = useState('stamp');
  const { toast } = useToast();
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
        toast({
          title: "Logo Uploaded",
          description: "Your logo has been uploaded successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSave = () => {
    toast({
      title: "Card Design Saved",
      description: "Your card design has been saved successfully.",
      variant: "default",
    });
    console.log({
      businessName,
      primaryColor,
      logo,
      selectedCardType
    });
    // In a real app, this would save to a backend
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
    >
      <h2 className="text-2xl font-semibold mb-4">Card Customization</h2>
      <p className="text-gray-600 mb-6">Design your loyalty card to match your brand.</p>
      
      <div className="space-y-6">
        {/* Business Name */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Label htmlFor="business-name" className="font-medium mb-1">Business Name</Label>
          <div className="flex items-center">
            <Edit className="w-5 h-5 mr-2 text-gray-500" />
            <Input
              id="business-name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Your Business Name"
              className="flex-1"
            />
          </div>
        </motion.div>
        
        {/* Color Selection */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Label className="font-medium mb-1">Brand Color</Label>
          <div className="flex items-center">
            <Palette className="w-5 h-5 mr-2 text-gray-500" />
            <Input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-12 h-10 p-1 border rounded-md cursor-pointer overflow-hidden"
            />
            <div className="flex flex-wrap gap-2 ml-4">
              {COLOR_PRESETS.map(color => (
                <motion.button
                  key={color}
                  onClick={() => setPrimaryColor(color)}
                  className="w-8 h-8 rounded-full border border-gray-200"
                  style={{ backgroundColor: color }}
                  aria-label={`Color ${color}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Logo Upload */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Label className="font-medium mb-1">Business Logo</Label>
          <div className="flex items-center">
            <Image className="w-5 h-5 mr-2 text-gray-500" />
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-20 h-20 border rounded-lg flex items-center justify-center bg-gray-50"
                  whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
                >
                  {logo ? (
                    <motion.img 
                      src={logo} 
                      alt="Business logo" 
                      className="w-full h-full object-contain" 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <p className="text-gray-400 text-sm text-center">No logo uploaded</p>
                  )}
                </motion.div>
                <div className="flex-1">
                  <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleLogoUpload}
                    className="text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended: Square PNG with transparent background</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Card Type Selection */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Label className="font-medium mb-2">Card Type</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {CARD_TYPES.map(card => (
              <motion.div 
                key={card.id}
                onClick={() => setSelectedCardType(card.id)}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedCardType === card.id ? 'border-loyalt-primary bg-loyalt-primary bg-opacity-5' : 'border-gray-200'
                }`}
                whileHover={{ scale: 1.03, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.05)" }}
                whileTap={{ scale: 0.97 }}
              >
                <h3 className="font-medium">{card.name}</h3>
                <p className="text-sm text-gray-600">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Preview */}
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Label className="font-medium mb-2">Preview</Label>
          <motion.div 
            className="w-full aspect-[1.6/1] rounded-xl shadow-lg overflow-hidden"
            style={{ backgroundColor: primaryColor }}
            whileHover={{ scale: 1.02, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between">
                {logo && (
                  <motion.img 
                    src={logo} 
                    alt="Logo" 
                    className="h-12 w-12 object-contain" 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  />
                )}
                <motion.h3 
                  className="text-white text-xl font-bold"
                  animate={{ x: logo ? 0 : -20 }}
                >
                  {businessName || 'Your Business'}
                </motion.h3>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <motion.p 
                  className="text-white text-2xl font-medium"
                  animate={{ scale: [0.9, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  {
                    selectedCardType === 'stamp' ? 'Stamp Card' :
                    selectedCardType === 'points' ? 'Points Card' :
                    selectedCardType === 'tier' ? 'Tier Card' : 'Visit Card'
                  }
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button 
            onClick={handleSave}
            className="w-full mt-4 bg-loyalt-primary hover:bg-opacity-90"
          >
            Save Card Design
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CardCustomizer;
