import styled from 'styled-components';

export const SAddress = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 30px;

  button {
    width: 90%;
    color: black;
    padding: 14px 12px;
    border-radius: 10px;
    cursor: pointer;
    background-color: #36D399;
    margin: auto;
  }

  button:disabled {
    opacity: 0.6;
  }
`;

export const SAddressForm = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 90%;

    p {
      font-size: 12px;
      font-weight: 700;
      margin-top: 20px;
    }

    input, select {
      border: none;
      width: 100%;
      padding: 14px 10px;
      border-radius: 8px;
      margin-top: 8px;
      background-color: #DADDE2;
    }

    input:focus {
      outline: none;
      background-color: #DADDE2;
    }
  }
`;
