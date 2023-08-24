import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as S from './SignUpPage.style';
import useInput from '../../hooks/useInput';
import { SignUpRequest } from '../../types/auth';
import { axiosFetch } from '../../api/axiosInstance';
import { API_PATH } from '../../api/apiConfig';
import axios from 'axios';

const SignUpPage = () => {
  const navigate = useNavigate()
const [errorMessage,setErrorMessage]=useState('')

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

  const signUp = async({email,password}:SignUpRequest)=>{
    try{
      const response = await axiosFetch.post(API_PATH.AUTH.SIGN_UP,{email,password})
      if(response?.status===201){
        alert('성공적으로 가입되었습니다!\n로그인페이지로 이동합니다.');
    navigate('/signin');
      }
    }catch(error){
      if(axios.isAxiosError(error)){
        setErrorMessage(error.response?.data.message)
      }
    }
  }

const handleSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
  event.preventDefault()
  signUp({email,password})
}

  return (
    <S.FormContainer>
      <S.FormName>회원가입</S.FormName>
      <S.Form onSubmit={handleSubmit}>
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
        {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
        <S.SubmitButton data-testid="signup-button" type="submit" disabled={!isFormValid}>
          회원가입
        </S.SubmitButton>
      </S.Form>
      <Link to="/signin">
        <S.MoveButton>
          계정이 있으신가요? <span className="bold">로그인</span>
        </S.MoveButton>
      </Link>
    </S.FormContainer>
  );
};

export default SignUpPage;
