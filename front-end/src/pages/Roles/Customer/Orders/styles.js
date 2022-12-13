import styled from 'styled-components';

export const SOrders = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  gap: 30px;
`;

export const SOrdersWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 350px;
  height: 80px;
  border: 1px solid #E2B659;
  background-color: #303030;
  font-weight: 700;
  color: #b1bdc5;
  border-radius: 4px;
`;

export const SRequestId = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const SRequestStatus = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 7px;

  span {
    font-size: 10px;
    font-weight: 700;
  }
`;

export const SRequestDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;
