import styled from 'styled-components';

const $Layout = styled.section`
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 100vh;
  }
`;

export { $Layout };
