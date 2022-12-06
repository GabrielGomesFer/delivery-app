import styled from 'styled-components';

export const SDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  img {
    height: 200px;
  }
`;

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  label {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  input {
    border: none;
    padding: 6px;
    border-radius: 4px;
    height: 40px;
    width: 300px;
  }

  input:focus {
    outline: none;
  }
`;

export const SButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  button {
    border: none;
    height: 40px;
    width: 200px;
    padding: 6px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    border: 1px solid #E2B659;
  }

  button:disabled {
    opacity: 0.3;
  }
`;

export const SError = styled.div`
  display: flex;
  width: 60%;
  height: 30px;
  font-weight: 700;
  font-size: 80%;
  border-radius: 4px;
  justify-content: flex-start;
  align-items: center;
  background-color: #F9F871;
  color: #412728;
  padding: 5px;
  margin: 50px 164px;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
`;
