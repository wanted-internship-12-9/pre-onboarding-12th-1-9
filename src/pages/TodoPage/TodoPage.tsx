import React from 'react';
import styled from 'styled-components';
export default function TodoPage() {
  return (
    <section>
      <TodoInputArea>
        <TodoInput data-testid="new-todo-input" placeholder="할 일을 입력해 주세요." />
        <TodoAddBtn data-testid="new-todo-add-button">추가</TodoAddBtn>
      </TodoInputArea>
    </section>
  );
}

const TodoInputArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  position: relative;
`;

const TodoInput = styled.input`
  font-size: 15px;
  padding: 0px 70px 0px 15px;
  border-radius: 50px;
  border: none;
  width: 100%;
  height: 40px;
  box-shadow: 0px 0px 5px lightgray;

  &:focus {
    outline: none;
    border: solid 1px lightgray;
  }
`;

const TodoAddBtn = styled.button`
  position: absolute;
  font-size: 15px;
  font-weight: 600;
  right: 17px;
  padding: 5px 10px;
  background-color: transparent;
  border: none;
`;
