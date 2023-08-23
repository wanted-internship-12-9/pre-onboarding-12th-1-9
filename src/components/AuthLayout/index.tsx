import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const AuthLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (currentPath === '/todo' && !accessToken) {
      navigate('/signin');
    }
    if ((currentPath === '/signin' || currentPath === '/signup') && accessToken) {
      navigate('/todo');
    }
  }, [currentPath]);

  return <Outlet />;
};

export default AuthLayout;
