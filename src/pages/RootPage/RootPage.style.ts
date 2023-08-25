import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
  padding: 30px;
  width: 90vw;
  max-width: 410px;
  border-radius: 4px;
  border: 1px solid lightgray;

  > a {
    width: 100%;
  }
`;

export const FormContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const FormTitle = styled.div`
  font-size: 30px;
  font-weight: bolder;
  margin-bottom: 20px;
`;

export const ActionButton = styled.button`
  width: 100%;
  height: 45px;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  background-color: #576cbc;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    background-color: lightgray;
  }
`;
