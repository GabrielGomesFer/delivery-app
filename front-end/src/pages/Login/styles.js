import styled from 'styled-components';

export const SLoginWrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  background-color: white;
`;

export const SImg = styled.div`
  width: 50%;

  img {
    height: 100vh;
    width: 100%;
    object-fit: cover;
  }

  @media (max-width: 414px) {
    display: none;
  }
`;

export const SLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  height: 100vh;
  width: 50%;
  gap: 40px;
  padding: 30px;

  h1 {
    font-weight: 700;
    font-size: 1.5rem;
  }

  @media (max-width: 414px) {
    width: 100%;
  }
`;

export const SLoginLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  p {
    font-size: 0.90rem;
    font-weight: 700;
  }

  input {
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

`;

export const SLoginButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;

  hr {
    border: 1px solid #DADDE2;
    width: 100%;
    margin: 10px 0;
  }

  button {
    width: 100%;
    color: whitesmoke;
    padding: 14px 12px;
    border-radius: 10px;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.6;
  }
`;
export const SError = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
  justify-content: center;
  background-color: #FF0000;
  color: #FEEDEC;
  padding: 12px 15px;
  margin: 8px 0;
  font-size: 13px;
  font-weight: 700;
  border-radius: 8px;
`;
