import React from 'react';
import * as S from './Layout.style';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <S.$Layout>{children}</S.$Layout>;
};

export default Layout;
