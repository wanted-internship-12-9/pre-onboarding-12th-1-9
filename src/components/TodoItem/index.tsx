import React, { useRef, useState } from 'react';
import axios from 'axios';

import { axiosFetch } from '../../api/axiosInstance';
import { API_PATH } from '../../api/apiConfig';

import * as S from './TodoItem.style';

interface TodoItemProps {
  id: number;
  todo: string;
  isCompleted: boolean;
  getTodos: () => Promise<void>;
}

const TodoItem = ({ id, todo, isCompleted, getTodos }: TodoItemProps) => {
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const editedTodoRef = useRef<HTMLInputElement>(null);
  const [todoText, setTodoText] = useState<string | undefined>(todo);

  const onEditedModeToggle = () => setIsEdited(prev => !prev);

  const onTodoDelete = async () => {
    if (!confirm('정말로 삭제하시겠습니까?')) {
      return;
    }
    try {
      await axiosFetch.delete(`${API_PATH.TODOS}/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
    getTodos();
  };
  const onTodoCompleted = async () => {
    try {
      await axiosFetch.put(`${API_PATH.TODOS}/${id}`, {
        todo: todoText,
        isCompleted: !isCompleted,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };
  const onEditedTodoSubmit = async () => {
    if (!confirm('이 내용으로 수정하시겠습니까?')) {
      return;
    }
    try {
      await axiosFetch.put(`${API_PATH.TODOS}/${id}`, {
        todo: editedTodoRef.current?.value,
        isCompleted,
      });
      setTodoText(editedTodoRef.current?.value);
      onEditedModeToggle();
      getTodos();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };
  return (
    <S.TodoItemContainer>
      <input type="checkbox" defaultChecked={isCompleted} onClick={onTodoCompleted} />
      {!isEdited ? (
        <S.TodoContent>
          <S.TodoText>{todoText}</S.TodoText>
          <S.ButtonContainer>
            <S.Button onClick={onEditedModeToggle}>수정</S.Button>
            <S.Button onClick={onTodoDelete}>삭제</S.Button>
          </S.ButtonContainer>
        </S.TodoContent>
      ) : (
        <S.TodoEditor>
          <S.EditedInput
            autoFocus
            type="text"
            defaultValue={todoText}
            ref={editedTodoRef}
            placeholder="할 일을 수정 해주세요."
          />
          <S.ButtonContainer>
            <S.Button onClick={onEditedTodoSubmit}>제출</S.Button>
            <S.Button onClick={onEditedModeToggle}>취소</S.Button>
          </S.ButtonContainer>
        </S.TodoEditor>
      )}
    </S.TodoItemContainer>
  );
};

export default TodoItem;
