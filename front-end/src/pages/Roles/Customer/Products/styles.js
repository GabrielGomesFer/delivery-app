import styled from 'styled-components';

export const SProductsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const STotalCart = styled.div`
  display: flex;
  width: 80%;
  margin: auto;
  justify-content: flex-end;

  button {
    background-color: #262626;
    margin-top: 3%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    gap: 5px;
    color: #b1bdc5;

    p {
      font-size: 14px;
      font-weight: 700;
    }
  }

  button:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

export const SProducts = styled.div`
  margin-top: 2%;
  padding-bottom: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
`;

export const SCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 300px;
  background-color: #303030;
  border-radius: 8px;
  padding: 15px 0%;
  gap: 20px;
  border: 1px solid #E2B659;

  img {
    height: 130px;
  }

  p {
    font-weight: 700;
    color: #b1bdc5;
  }

  span {
    font-weight: 500;
    color: #E2B659;
  }
`;
