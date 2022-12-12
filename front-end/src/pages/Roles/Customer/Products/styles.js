import styled from 'styled-components';

export const SProductsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const STotalCart = styled.button`
  background-color: #b1bdc5;
  margin-top: 3%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 89%;
  cursor: pointer;
  gap: 5px;

  p {
    font-size: 14px;
    font-weight: 700;
    color: black;
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
  background-color: #dadde2;
  border-radius: 8px;
  color: whitesmoke;
  padding: 15px 0%;
  gap: 20px;

  img {
    height: 130px;
  }

  p {
    font-weight: 700;
    color: black;
  }

  span {
    font-weight: 500;
    color: #3a3430;
  }
`;
