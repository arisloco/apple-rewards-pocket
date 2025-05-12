
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RewardsPage from "./pages/RewardsPage";
import ShopsPage from "./pages/ShopsPage";
import ProfilePage from "./pages/ProfilePage";
import ScanPage from "./pages/ScanPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import VendorDashboard from "./pages/VendorDashboard";
import WelcomeScreen from "./components/WelcomeScreen";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for welcome animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Show welcome screen while loading
  if (isLoading) {
    return <WelcomeScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/rewards" element={<ProtectedRoute><RewardsPage /></ProtectedRoute>} />
              <Route path="/shops" element={<ProtectedRoute><ShopsPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/scan" element={<ProtectedRoute><ScanPage /></ProtectedRoute>} />
              <Route path="/vendor/dashboard" element={<ProtectedRoute><VendorDashboard /></ProtectedRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
