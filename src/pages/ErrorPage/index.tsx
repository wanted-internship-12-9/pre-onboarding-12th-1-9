import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './ErrorPage.style';

const ErrorPage = () => {
  const navigate = useNavigate();

  const prevPage = () => {
    navigate(-1);
  };

  return (
    <S.NotFoundContainer>
      <S.ErrorStateText>페이지를 찾을 수 없습니다.</S.ErrorStateText>
      <S.PrevPageButton onClick={prevPage}>이전 페이지로 돌아가기</S.PrevPageButton>
    </S.NotFoundContainer>
  );
};

export default ErrorPage;
