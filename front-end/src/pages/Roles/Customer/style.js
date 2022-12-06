import styled from 'styled-components';

export const SWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  flex-wrap: wrap;
  width: 100%;
  max-height: 100vh;
  height: 100vh;
  overflow: auto;
  padding-bottom: 70px;
`;

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 50%;
  width: 100%;
  padding: 15px;
  user-select: none;

  img {
    height: 150px;
    width: 150px;
  }
`;

export const SText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  padding: 10px;
  height: 90px;
`;

export const SInfos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  user-select: none;
`;
