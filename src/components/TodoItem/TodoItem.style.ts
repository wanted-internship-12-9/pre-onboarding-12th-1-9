import styled from 'styled-components';

export const TodoItemContainer = styled.li`
  display: flex;
  width: 100%;
  padding: 10px;
  height: 3em;
  align-items: center;
`;

export const TodoContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TodoText = styled.span`
  display: flex;
  margin: auto 0;
  padding: 0px 70px 0px 15px;
  font-size: 15px;
`;

export const ButtonContainer = styled.div`
  & > button:nth-child(2) {
    margin-left: 10px;
  }
  margin-right: 10px;
`;

export const Button = styled.button`
  font-size: 15px;
  font-weight: 600;
  background-color: transparent;
  border: none;
`;

export const TodoEditor = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const EditedInput = styled.input`
  font-size: 15px;
  padding: 0px 70px 0px 15px;

  border: none;
  width: 80%;
  height: 40px;
  border-bottom: solid 1px lightgray;

  &:focus {
    outline: none;
    border-bottom: solid 1px black;
  }
`;
