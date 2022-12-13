import styled from 'styled-components';

export const SRequestInfos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  font-size: 15px;
  font-weight: 700;
  gap: 50px;

  div {
    display: flex;
    gap: 30px;
    align-items: center;
    justify-content: center;

    button {
      width: 100%;
      color: whitesmoke;
      padding: 12px 14px;
      border-radius: 10px;
      cursor: pointer;
      background-color: #36D399;
    }

    button:disabled {
      opacity: 0.6;
      cursor: default;
    }
  }
`;

export default SRequestInfos;
