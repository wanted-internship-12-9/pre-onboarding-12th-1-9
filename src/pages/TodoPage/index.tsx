import React, { useCallback, useEffect, useState } from 'react';
import { API_PATH } from '../../api/apiConfig';
import { axiosFetch } from '../../api/axiosInstance';
import TodoItem from '../../components/TodoITem';
import {
  TodoAddBtn,
  TodoArea,
  TodoContainer,
  TodoInput,
  TodoInputArea,
  TodoListArea,
  TodoTitle,
} from './TodoPage.style';
import { TodoResponse } from '../../types/todo';
import axios from 'axios';

function TodoPage() {
  const [todoList, setTodoList] = useState<TodoResponse[]>();
  const [newTodoInput, setNewTodoInput] = useState<string>('');
  const getTodos = useCallback(async () => {
    try {
      const result = await axiosFetch.get(API_PATH.TODOS);
      setTodoList(result?.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status !== 200) {
          alert(error.response?.data.message);
        } else {
          alert('일시적인 오류로 내용을 불러올 수 없습니다. 다시 시도해주세요.');
        }
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
        if (error.response?.status !== 201) {
          alert(error.response?.data.message);
        } else {
          alert('일시적인 오류로 내용을 적용할 수 없습니다. 다시 시도해주세요.');
        }
      }
    }
  };
  const onChangeTodoBody = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoInput(e.target.value);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <TodoContainer>
      <TodoArea>
        <TodoTitle>Todo List</TodoTitle>
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
        <TodoListArea>
          {todoList?.map(({ id, todo, isCompleted }) => (
            <TodoItem key={id} id={id} todo={todo} isCompleted={isCompleted} getTodos={getTodos} />
          ))}
        </TodoListArea>
      </TodoArea>
    </TodoContainer>
  );
}

export default TodoPage;
