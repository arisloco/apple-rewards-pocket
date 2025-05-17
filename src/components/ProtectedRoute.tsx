
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: ReactNode;
  requireRole?: 'client' | 'vendor';
}

const ProtectedRoute = ({ children, requireRole }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // If still loading auth state, show a loading spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-loyalt-gradient-start to-loyalt-gradient-end">
        <LoadingSpinner size="large" text="Authenticating..." />
      </div>
    );
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role requirement is specified, check if user has the required role
  if (requireRole && user?.role !== requireRole) {
    // Redirect clients to client home when they try to access vendor routes
    if (requireRole === 'vendor' && user?.role === 'client') {
      return <Navigate to="/rewards" replace />;
    }
    
    // Redirect vendors to vendor dashboard when they try to access client routes
    if (requireRole === 'client' && user?.role === 'vendor') {
      return <Navigate to="/vendor/dashboard" replace />;
    }
  }
  
  // If authenticated and role check passes (if applicable), render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
