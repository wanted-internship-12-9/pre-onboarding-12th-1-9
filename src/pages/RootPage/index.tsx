import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './RootPage.style';

const RootPage = () => {
  return (
    <S.FormContainer>
      <S.FormTitle>TODO LIST</S.FormTitle>
      <S.ButtonContainer>
        <Link to="/signin">
          <S.ActionButton>로그인</S.ActionButton>
        </Link>
        <Link to="/signup">
          <S.ActionButton>회원가입</S.ActionButton>
        </Link>
      </S.ButtonContainer>
    </S.FormContainer>
  );
};

export default RootPage;
