import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// This component prevents authenticated users from accessing login/signup pages
export default function AuthRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          border: '5px solid rgba(63, 81, 181, 0.2)',
          borderTopColor: '#3F51B5',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }
  
  // If user is already authenticated, redirect to home page
  if (isAuthenticated) {
    // Get the intended destination from state, or default to home
    const from = location.state?.from || '/';
    return <Navigate to={from} replace />;
  }
  
  // Render children if not authenticated
  return children;
}