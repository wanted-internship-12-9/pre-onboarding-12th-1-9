import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RootPage from '../pages/RootPage';
import SignUpPage from '../pages/SignUpPage';
import SignInPage from '../pages/SignInPage';
import TodoPage from '../pages/TodoPage';
import AuthLayout from '../components/AuthLayout';
import ErrorPage from '../pages/ErrorPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<RootPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="todo" element={<TodoPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
