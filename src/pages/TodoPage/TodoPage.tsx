import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { axiosFetch } from '../../api/axiosInstance';
import { API_PATH } from '../../api/apiConfig';

export default function TodoPage() {
  const [newTodoInput, setNewTodoInput] = useState<string>('');

  const createTodo = async () => {
    try {
      if (newTodoInput) {
        const newTodo = {
          todo: newTodoInput,
        };
        await axiosFetch.post(API_PATH.TODOS, newTodo);
        // getTodos();  // get 요청 부분
        setNewTodoInput('');
      }
    } catch (err) {
      alert(err);
    }
  };

  const onChangeTodoBody = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoInput(e.target.value);
  };

  return (
    <section>
      <TodoInputArea>
        <TodoInput
          data-testid="new-todo-input"
          placeholder="할 일을 입력해 주세요."
          value={newTodoInput}
          onChange={onChangeTodoBody}
        />
        <TodoAddBtn data-testid="new-todo-add-button" onClick={createTodo}>
          추가
        </TodoAddBtn>
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
