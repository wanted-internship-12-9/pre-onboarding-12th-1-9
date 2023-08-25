import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

import useInput from '../../hooks/useInput';
import { axiosFetch } from '../../api/axiosInstance';
import { API_PATH } from '../../api/apiConfig';
import { SignInRequest, SignInResponse } from '../../types/auth';

import * as S from './SignInPage.style';

const SignInPage = () => {
  const navigate = useNavigate();
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
  const [errorMessage, setErrorMessage] = useState('');

  const signIn = async ({ email, password }: SignInRequest) => {
    try {
      const response: AxiosResponse<SignInResponse> = await axiosFetch.post(API_PATH.AUTH.SIGN_IN, {
        email,
        password,
      });
      if (response?.status === 200) {
        localStorage.setItem('accessToken', response?.data.access_token);
        navigate('/todo');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setErrorMessage('아이디나 비밀번호를 잘못 입력했습니다.');
        } else {
          setErrorMessage('일시적인 오류로 로그인 할 수 없습니다. 다시 시도해주세요.');
        }
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn({ email, password });
  };

  return (
    <S.FormContainer>
      <S.FormName>로그인</S.FormName>
      <S.Form onSubmit={handleSubmit}>
        <S.FormInput
          data-testid="email-input"
          type="text"
          value={email}
          placeholder="이메일을 입력해 주세요"
          onChange={event => setEmail(event.target.value)}
        />
        {email !== '' && isEmailError && (
          <S.ErrorMessage>올바르지 않은 이메일 형식입니다.</S.ErrorMessage>
        )}
        <S.FormInput
          data-testid="password-input"
          type="password"
          value={password}
          placeholder="비밀번호를 입력해 주세요"
          onChange={event => setPassword(event.target.value)}
        />
        {password !== '' && isPasswordError && (
          <S.ErrorMessage>비밀번호는 8자 이상이어야 합니다.</S.ErrorMessage>
        )}
        {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
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
