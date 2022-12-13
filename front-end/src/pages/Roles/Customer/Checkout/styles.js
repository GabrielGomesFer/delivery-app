import styled from 'styled-components';

export const SH1 = styled.h1`
  padding: 30px;
`;

export const STable = styled.table`
  border-radius: 6px;
  max-width: 1100px; 
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  thead {
    display: flex;
  
    tr {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 60px;
      background: #FFED86;
      font-size: 16px;
      width: 100%;
      font-weight: 700;
    }
  }

  tbody {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const STotalValue = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 700;
  gap: 10px;
  justify-content: flex-end;
  width: 82%;
  align-items: center;
  height: 50px;
  margin: auto;
`;
