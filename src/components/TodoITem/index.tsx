import React, { useRef, useState } from 'react';
import { axiosFetch } from '../../api/axiosInstance';
import { API_PATH } from '../../api/apiConfig';
import {
  TodoItemContainer,
  TodoText,
  Button,
  TodoContent,
  TodoEditor,
  EditedInput,
  ButtonContainer,
} from './TodoItem.style';
import axios from 'axios';

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
        if (error.response?.status !== 204) {
          alert(error.response?.data.message);
        } else {
          alert('일시적인 오류로 내용을 삭제할 수 없습니다. 다시 시도해주세요.');
        }
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
        if (error.response?.status !== 200) {
          alert(error.response?.data.message);
        } else {
          alert('일시적인 오류로 내용을 변경할 수 없습니다. 다시 시도해주세요.');
        }
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
        if (error.response?.status !== 200) {
          alert(error.response?.data.message);
        } else {
          alert('일시적인 오류로 내용을 변경할 수 없습니다. 다시 시도해주세요.');
        }
      }
    }
  };
  return (
    <TodoItemContainer>
      <input type="checkbox" defaultChecked={isCompleted} onClick={onTodoCompleted} />
      {!isEdited ? (
        <TodoContent>
          <TodoText>{todoText}</TodoText>
          <ButtonContainer>
            <Button onClick={onEditedModeToggle}>수정</Button>
            <Button onClick={onTodoDelete}>삭제</Button>
          </ButtonContainer>
        </TodoContent>
      ) : (
        <TodoEditor>
          <EditedInput
            autoFocus
            type="text"
            defaultValue={todoText}
            ref={editedTodoRef}
            placeholder="할 일을 수정 해주세요."
          />
          <ButtonContainer>
            <Button onClick={onEditedTodoSubmit}>제출</Button>
            <Button onClick={onEditedModeToggle}>취소</Button>
          </ButtonContainer>
        </TodoEditor>
      )}
    </TodoItemContainer>
  );
};

export default TodoItem;
