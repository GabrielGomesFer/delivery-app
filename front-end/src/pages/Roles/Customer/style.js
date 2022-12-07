import styled from 'styled-components';

export const SContainerCustomer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;

  h1 {
    font-size: 30px;
    line-height: 12px;
    padding: 20px;
  }
`;

export const SWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: auto;
  flex-wrap: wrap;
  width: 100%;
  max-height: 100vh;
  height: 100vh;
  overflow: auto;
  padding: 30px 0;
`;

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #73443B;
  width: 190px;
  padding: 10px 0;
  user-select: none;
  border-radius: 8px;

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

export const SCart = styled.div`
  z-index: 10;
  display: flex;
  justify-content: center;
  color: whitesmoke;
  gap: 5px;
  font-weight: 700;
  font-size: 15px;
  width: 100%;
  align-items: center;
  padding: 20px;
  border-top: 1px solid whitesmoke;

  button {
    background-color: transparent;
    border: none;
    font-size: 20px;
    font-weight: 700;
    color: white;
    cursor: pointer;
  }
`;

export const SWrapperCheckout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  margin: 10px;
  border-radius: 6px;
  background-color: whitesmoke;
  color: black;
`;

export const SCheckout = styled.div`
  display: flex;
  align-items: center;
  height: 140px;
  width: 100%;
  gap: 20px;
  font-size: 15px;
  font-weight: 700;

  img {
    height: 100px;
  }

  section {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;

    button {
      background-color: transparent;
      border: none;
      margin-top: 3px;
    }
  }
`;

export const SCartDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 35px;
`;

export const SCartDetailsTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
`;

export const STotalValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 16px;
  font-weight: 700;
  gap: 5px;
`;

export const SAddress = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 10px 0 50px 30px;

  label {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 5px;

    input, select {
      max-width: 90%;
      width: 100%;
      padding: 7px;
      border: none;
      margin: 2px;
    }

    input:focus, select:focus {
      outline: none;
    }
  }
`;
