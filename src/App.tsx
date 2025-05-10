
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import RewardsPage from "./pages/RewardsPage";
import ShopsPage from "./pages/ShopsPage";
import ProfilePage from "./pages/ProfilePage";
import ScanPage from "./pages/ScanPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import VendorDashboard from "./pages/VendorDashboard";
import WelcomeScreen from "./components/WelcomeScreen";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if user is logged in from localStorage
    return localStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    // Simulate loading time for welcome animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Function to handle login state
  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

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
          <Routes>
            <Route 
              path="/login" 
              element={
                isLoggedIn ? 
                <Navigate to="/" /> : 
                <LoginPage onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/" 
              element={
                isLoggedIn ? 
                <Index /> : 
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/rewards" 
              element={
                isLoggedIn ? 
                <RewardsPage onLogout={handleLogout} /> : 
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/shops" 
              element={
                isLoggedIn ? 
                <ShopsPage onLogout={handleLogout} /> : 
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/profile" 
              element={
                isLoggedIn ? 
                <ProfilePage onLogout={handleLogout} /> : 
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/scan" 
              element={
                isLoggedIn ? 
                <ScanPage onLogout={handleLogout} /> : 
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/vendor/dashboard" 
              element={
                isLoggedIn ? 
                <VendorDashboard onLogout={handleLogout} /> : 
                <Navigate to="/login" />
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
