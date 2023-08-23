import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './SignInPage.style';
import useInput from '../../hooks/useInput';

const SignInPage = () => {
  const {
    value: email,
    setValue: setEmail,
    isError: isEmailError,
  } = useInput({
    regex: /@/,
    initialValue: '',
  });
  const {
    value: password,
    setValue: setPassword,
    isError: isPasswordError,
  } = useInput({
    regex: /^.{8,}$/,
    initialValue: '',
  });
  const isFormValid = !isEmailError && !isPasswordError;

  return (
    <S.FormContainer>
      <S.FormName>로그인</S.FormName>
      <S.Form>
        <S.FormInput
          data-testid="email-input"
          type="text"
          value={email}
          placeholder="이메일을 입력해 주세요"
          onChange={e => setEmail(e.target.value)}
        />
        {email !== '' && isEmailError && (
          <S.ErrorMessage>올바르지 않은 이메일 형식입니다.</S.ErrorMessage>
        )}
        <S.FormInput
          data-testid="password-input"
          type="password"
          value={password}
          placeholder="비밀번호를 입력해 주세요"
          onChange={e => setPassword(e.target.value)}
        />
        {password !== '' && isPasswordError && (
          <S.ErrorMessage>비밀번호는 8자 이상이어야 합니다.</S.ErrorMessage>
        )}
        <S.SubmitButton data-testid="signin-button" type="submit" disabled={!isFormValid}>
          로그인
        </S.SubmitButton>
      </S.Form>
      <Link to="/signup">
        <S.MoveButton>
          계정이 없으신가요? <span className="bold">가입하기</span>
        </S.MoveButton>
      </Link>
    </S.FormContainer>
  );
};

export default SignInPage;
