import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import { axiosFetch } from '../../api/axiosInstance';
import { API_PATH } from '../../api/apiConfig';

interface TodoItemProps {
  id: number;
  todo: string;
  isCompleted: boolean;
  getTodos: () => void;
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
    } catch (err) {
      alert(err);
    }
    getTodos();
  };
  const onTodoCompleted = async () => {
    try {
      await axiosFetch.put(`${API_PATH.TODOS}/${id}`, {
        todo: todoText,
        isCompleted: !isCompleted,
      });
    } catch (err) {
      alert(err);
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
      getTodos();
    } catch (err) {
      alert(err);
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

const TodoItemContainer = styled.li`
  display: flex;
  width: 100%;
  padding: 10px;
  height: 3em;
  align-items: center;
`;

const TodoContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TodoText = styled.span`
  display: flex;
  margin: auto 0;
  padding: 0px 70px 0px 15px;
  font-size: 15px;
`;

const ButtonContainer = styled.div`
  & > button:nth-child(2) {
    margin-left: 10px;
  }
  margin-right: 10px;
`;

const Button = styled.button`
  font-size: 15px;
  font-weight: 600;
  background-color: transparent;
  border: none;
`;

const TodoEditor = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditedInput = styled.input`
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
