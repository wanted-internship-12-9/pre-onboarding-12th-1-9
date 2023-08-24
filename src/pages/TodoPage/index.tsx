import React, { useEffect, useState } from 'react';
import { API_PATH } from '../../api/apiConfig';
import { axiosFetch } from '../../api/axiosInstance';
import {
  TodoAddBtn,
  TodoArea,
  TodoContainer,
  TodoInput,
  TodoInputArea,
  TodoListArea,
  TodoTitle,
} from '../../styles/todoStyles.style';
import { TodoResponse } from '../../types/todo';

function TodoPage() {
  const [todoList, setTodoList] = useState<TodoResponse[]>();
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
  console.info('todoList: ', todoList);

  useEffect(() => {
    getTodos();
  }, []);
  const getTodos = async () => {
    try {
      const result = await axiosFetch.get(API_PATH.TODOS);
      setTodoList(result?.data);
    } catch (err) {
      alert(err);
    }
  };
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
        <TodoListArea style={{ background: 'lightblue' }}>Todo Item</TodoListArea>
      </TodoArea>
    </TodoContainer>
  );
}

export default TodoPage;
