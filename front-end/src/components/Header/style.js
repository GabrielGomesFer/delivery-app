import styled from 'styled-components';

export const SHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #3a3430;
  padding: 10px;
  background-color: #0D0D0D;
  border-bottom: 1px solid #E2B659;
`;

export const SNavProducts = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-around;
  width: 450px;
  font-weight: 700;

  img {
    height: 50px;
  }

  a {
    color: #b1bdc5;
  }

`;

export const SUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  font-weight: 700;
  width: 300px;
  color: #b1bdc5;

  div {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  button {
    background-color: transparent;
    border: none;
    color: #b1bdc5;
  }
`;
