import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SDiv, SError } from '../Login/styles';
import { SButtons, SContainer, SForm } from './styles';

function Register() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const verifyInputEmail = ({ target: { value } }) => {
    const regexValidation = /\S+@\w+\.\w+/i;
    const finalValidation = regexValidation.test(email);
    setEmail(value);
    setDisable(finalValidation);
  };

  const verifyError = async () => {
    axios
      .post('http://localhost:3001/user/register', {
        name: username,
        email,
        password,
      })
      .then((response) => {
        const { token, role, email: bEmail, name } = response.data;
        localStorage.setItem('token', JSON.stringify({
          token,
          role,
          bEmail,
          name,
        }));
        history.push('/customer/products');
      })
      .catch((err) => {
        setUsername('');
        setEmail('');
        setPassword('');
        setError(true);
        setErrorMessage(err.response.data.message);
        setTimeout(() => setError(false), '5' * '1000');
      });
  };

  return (
    <SDiv>
      <SForm>
        <img
          src="https://user-images.githubusercontent.com/99758843/204924163-ebb5518e-e604-4f3f-9428-ddd185235a8a.png"
          alt="logo UNOSSO"
        />
        <SContainer>
          <label htmlFor="name">
            Nome
            <input
              type="text"
              placeholder="digite o seu nome"
              name="username"
              value={ username }
              onChange={ ({ target: { value } }) => setUsername(value) }
              data-testid="common_register__input-name"
              autoComplete="off"
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              type="email"
              placeholder="digite o seu email"
              name="email"
              value={ email }
              onChange={ verifyInputEmail }
              data-testid="common_register__input-email"
              autoComplete="off"
            />
          </label>

          <label htmlFor="password">
            Senha
            <input
              type="password"
              placeholder="digite a sua senha"
              name="password"
              value={ password }
              onChange={ ({ target: { value } }) => setPassword(value) }
              data-testid="common_register__input-password"
            />
          </label>
        </SContainer>
        <SButtons>
          <button
            type="button"
            data-testid="common_register__button-register"
            disabled={ !disable || password.length < '6' || username.length < '12' }
            onClick={ () => verifyError() }
          >
            Cadastrar
          </button>
        </SButtons>
      </SForm>
      {error && (
        <SError>
          <p
            data-testid="common_register__element-invalid_register"
          >
            {errorMessage ?? 'Usuário e senha inválidos!'}
          </p>
        </SError>
      )}
    </SDiv>
  );
}

export default Register;
