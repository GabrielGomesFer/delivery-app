import styled from 'styled-components';

export const SForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  img {
    height: 200px;
    margin-top: 20px;
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
`;
