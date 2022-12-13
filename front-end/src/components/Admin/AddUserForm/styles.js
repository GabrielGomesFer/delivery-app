import styled from 'styled-components';

export const SAdminWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 12px;
`;

export const SAdminForm = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;

  label {
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
      font-size: 12px;
      font-weight: 700;
      margin-top: 20px;
    }

    input, select {
      border: none;
      width: 200px;
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

export const SAdminButton = styled.div`
  display: flex;
  align-items: center;
  padding-top: 30px;

  button {
    color: #2FC18C;
    width: 40px;
    height: 40px;
    border-radius: 6px;
    cursor: pointer;
    transition-property: color, background-color, border-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  }

  button:hover {
    color: white;
    background-color: #2FC18C;
  }

  button:disabled {
    cursor: default;
    color: #2FC18C;
    background-color: #636363;
    opacity: 0.8;
  }
`;
