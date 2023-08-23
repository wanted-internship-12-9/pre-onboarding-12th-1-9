import * as React from 'react';
import {
  TodoArea,
  TodoContainer,
  TodoInputArea,
  TodoListArea,
  TodoTitle,
} from '../../styles/todoStyles.style';

function TodoList() {
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
