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
  width: 320px;
  height: 80px;
  border: 1px solid black;
  font-weight: 700;
  color: black;
`;

export const SRequestId = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const SRequestStatus = styled.div`
`;

export const SRequestDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;
