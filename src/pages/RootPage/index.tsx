import React from 'react';
import { Link } from 'react-router-dom';
import { FormContainer, FormTitle, ButtonContainer, ActionButton } from './RootPage.style';

const RootPage = () => {
  return (
    <FormContainer>
      <FormTitle>TODO LIST</FormTitle>
      <ButtonContainer>
        <Link to="/signin">
          <ActionButton>로그인</ActionButton>
        </Link>
        <Link to="/signup">
          <ActionButton>회원가입</ActionButton>
        </Link>
      </ButtonContainer>
    </FormContainer>
  );
};

export default RootPage;
