import { Navigate, Outlet } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const PublicRoute = () => {
  const { isAuthenticated } = useApp();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
