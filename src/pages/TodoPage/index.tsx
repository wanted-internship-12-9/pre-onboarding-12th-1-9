import { useEffect, useState } from 'react';
import { API_PATH } from '../../api/apiConfig';
import { axiosFetch } from '../../api/axiosInstance';
import {
  TodoContainer,
  TodoArea,
  TodoInputArea,
  TodoListArea,
  TodoTitle,
} from '../../styles/todoStyles.style';
import { TodoResponse } from '../../types/todo';

function TodoList() {
  const [todoList, setTodoList] = useState<TodoResponse[]>();
  console.info('todoList: ', todoList);
  useEffect(() => {
    getTodos();
  }, [])
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
        <TodoInputArea style={{ background: 'lightgreen' }}>Insert Form</TodoInputArea>
        <TodoListArea style={{ background: 'lightblue' }}>Todo Item</TodoListArea>
      </TodoArea>
    </TodoContainer>
  );
}

export default TodoList;
