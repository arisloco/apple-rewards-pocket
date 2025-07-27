
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import AnalyticsDashboard from '@/components/vendor/AnalyticsDashboard';
import CardCustomizer from '@/components/vendor/CardCustomizer';
import QRGenerator from '@/components/QRGenerator';

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-loyalt-gradient-start to-loyalt-gradient-end">
      <Header />
      
      <motion.div 
        className="flex-1 p-4 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Tabs 
          defaultValue="analytics" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="max-w-4xl mx-auto"
        >
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="qrcodes">QR Codes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analytics" className="space-y-4">
            <AnalyticsDashboard />
          </TabsContent>
          
          <TabsContent value="rewards" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <CardCustomizer />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="qrcodes" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <QRGenerator />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default VendorDashboard;
