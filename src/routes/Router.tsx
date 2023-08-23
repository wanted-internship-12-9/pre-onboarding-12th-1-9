import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RootPage from '../pages/RootPage';
import SignUpPage from '../pages/SignUpPage';
import SignInPage from '../pages/SignInPage';
import TodoPage from '../pages/TodoPage';
import AuthLayout from '../components/AuthLayout';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route element={<AuthLayout />}>
          <Route path="signup" element={<SignUpPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="todo" element={<TodoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
