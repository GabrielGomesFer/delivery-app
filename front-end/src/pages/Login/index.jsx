import axios from 'axios';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SButtons, SContainer, SDiv, SError, SForm } from './styles';

function Login() {
  const history = useHistory();
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
      .post('http://localhost:3001/login', {
        email,
        password,
      })
      .then((response) => {
        const { token, role, email: bEmail, name } = response.data;
        localStorage.setItem('user', JSON.stringify({
          token,
          role,
          email: bEmail,
          name,
        }));
        if (role === 'customer') {
          history.push('/customer/products');
        }
        if (role === 'seller') {
          history.push('/seller/orders');
        }
        if (role === 'administrator') {
          history.push('/admin/manage');
        }
      })
      .catch((err) => {
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
          <label htmlFor="email">
            Email
            <input
              type="email"
              placeholder="digite o seu email"
              name="email"
              value={ email }
              onChange={ verifyInputEmail }
              data-testid="common_login__input-email"
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
              data-testid="common_login__input-password"
            />
          </label>
        </SContainer>
        <SButtons>
          <button
            type="button"
            data-testid="common_login__button-login"
            disabled={ !disable || password.length < '6' }
            onClick={ () => verifyError() }
          >
            Login
          </button>
          <Link to="/register">
            <button
              type="button"
              data-testid="common_login__button-register"
            >
              Ainda não tenho conta
            </button>
          </Link>
        </SButtons>
      </SForm>
      {error && (
        <SError>
          <p
            data-testid="common_login__element-invalid-email"
          >
            {errorMessage ?? 'Usuário e senha inválidos!'}
          </p>
        </SError>
      )}
    </SDiv>
  );
}

export default Login;
