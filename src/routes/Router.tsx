import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RootPage from '../pages/RootPage';
import SignUpPage from '../pages/SignUpPage';
import SignInPage from '../pages/SignInPage';
import TodoPage from '../pages/TodoPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="todo" element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
