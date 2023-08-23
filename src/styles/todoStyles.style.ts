import styled from 'styled-components';

export const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export const TodoArea = styled.div`
  width: 100vw;
  max-width: 700px;
  padding: 20px;
`;

export const TodoTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  font-weight: 600;
  margin: 10px 0 20px 0;
`;

export const TodoInputArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin-bottom: 20px;
  position: relative;
`;

export const TodoListArea = styled.ul`
  list-style: none;

  :last-child {
    border-bottom: none;
  }
`;
