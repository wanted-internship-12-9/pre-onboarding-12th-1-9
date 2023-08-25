import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthLayout = () => {
  const location = useLocation();

  const currentPath = location.pathname;
  const accessToken = localStorage.getItem('accessToken');

  if (currentPath === '/todo' && !accessToken) {
    return <Navigate to="/signin" />;
  }
  if (
    (currentPath === '/' || currentPath === '/signin' || currentPath === '/signup') &&
    accessToken
  ) {
    return <Navigate to="/todo" />;
  }

  return <Outlet />;
};

export default AuthLayout;
