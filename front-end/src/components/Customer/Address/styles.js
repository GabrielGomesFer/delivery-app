import styled from 'styled-components';

export const SAddress = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 30px;

  button {
    width: 40%;
    color: whitesmoke;
    padding: 14px 12px;
    border-radius: 10px;
    cursor: pointer;
    background-color: #8b5cf6;
  }

  button:disabled {
    opacity: 0.6;
  }
`;

export const SAddressForm = styled.div`
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;
    max-width: 40%;
    justify-content: center;

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
