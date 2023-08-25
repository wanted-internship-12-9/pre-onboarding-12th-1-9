import React, { useCallback, useEffect, useState } from 'react';
import { API_PATH } from '../../api/apiConfig';
import { axiosFetch } from '../../api/axiosInstance';
import TodoItem from '../../components/TodoItem';
import * as S from './TodoPage.style';
import { TodoResponse } from '../../types/todo';
import axios from 'axios';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function TodoPage() {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState<TodoResponse[]>();
  const [newTodoInput, setNewTodoInput] = useState<string>('');
  const getTodos = useCallback(async () => {
    try {
      const result = await axiosFetch.get(API_PATH.TODOS);
      setTodoList(result?.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  }, []);
  const createTodo = async () => {
    try {
      if (newTodoInput) {
        const newTodo = {
          todo: newTodoInput,
        };
        await axiosFetch.post(API_PATH.TODOS, newTodo);
        getTodos();
        setNewTodoInput('');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };
  const onChangeTodoBody = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoInput(e.target.value);
  };
  const logOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/signin');
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <S.TodoContainer>
      <S.TodoArea>
        <S.TodoTitle>
          Todo List
          <FiLogOut className="logoutBtn" size={21} onClick={logOut} />
        </S.TodoTitle>
        <S.TodoInputArea>
          <S.TodoInput
            data-testid="new-todo-input"
            placeholder="할 일을 입력해 주세요."
            value={newTodoInput}
            onChange={onChangeTodoBody}
          />
          <S.TodoAddBtn data-testid="new-todo-add-button" onClick={createTodo}>
            추가
          </S.TodoAddBtn>
        </S.TodoInputArea>
        <S.TodoListArea>
          {todoList?.map(({ id, todo, isCompleted }) => (
            <TodoItem key={id} id={id} todo={todo} isCompleted={isCompleted} getTodos={getTodos} />
          ))}
        </S.TodoListArea>
      </S.TodoArea>
    </S.TodoContainer>
  );
}

export default TodoPage;
