import axios from 'axios';
import { Warning } from 'phosphor-react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  SError,
  SImg,
  SLoginButtons,
  SLoginForm,
  SLoginLabel,
  SLoginWrapper,
} from './styles';

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
    <SLoginWrapper>
      <SImg>
        <img src="https://picsum.photos/1000" alt="" />
      </SImg>
      <SLoginForm>
        <h1>Entre com a sua conta</h1>
        {error && (
          <SError>
            <Warning size={ 22 } />
            <p
              data-testid="common_login__element-invalid-email"
            >
              {errorMessage ?? 'Usuário e senha inválidos!'}
            </p>
          </SError>
        )}
        <SLoginLabel>
          <label htmlFor="email">
            <p>Email</p>
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
            <p>Senha</p>
            <input
              type="password"
              placeholder="digite a sua senha"
              name="password"
              value={ password }
              onChange={ ({ target: { value } }) => setPassword(value) }
              data-testid="common_login__input-password"
            />
          </label>
        </SLoginLabel>
        <SLoginButtons>
          <button
            type="button"
            data-testid="common_login__button-login"
            disabled={ !disable || password.length < '6' }
            onClick={ () => verifyError() }
            style={ { backgroundColor: '#8b5cf6' } }
          >
            Login
          </button>
          <hr />
          <Link to="/register">
            <button
              type="button"
              data-testid="common_login__button-register"
              style={ { backgroundColor: '#ec2323' } }
            >
              Ainda não tenho conta
            </button>
          </Link>
        </SLoginButtons>
      </SLoginForm>
    </SLoginWrapper>
  );
}

export default Login;
