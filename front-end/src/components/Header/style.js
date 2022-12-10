import styled from 'styled-components';

export const SHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #3a3430;
  padding: 7px;
  background-color: #B1BDC5;
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
    color: black
  }

`;

export const SUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  font-weight: 700;
  gap: 20px;
  width: 500px;
  color: black;

  div {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  button {
    background-color: transparent;
    border: none;
    color: #ff0000;
  }
`;
