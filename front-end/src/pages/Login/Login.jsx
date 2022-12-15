import axios from 'axios';
import { Warning } from 'phosphor-react';
import { useEffect, useState } from 'react';
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
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;

  const setUserState = (name, value) => setUser({ ...user, [name]: value });

  const verifyInputEmail = () => {
    const regexValidation = /\S+@\w+\.\w+/i;
    const finalValidation = regexValidation.test(email);
    setDisable(finalValidation);
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      history.push('/');
    }
  }, [history]);

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
        console.log(err.message);
        setUserState({
          email: '',
          password: '',
        });
        setError(true);
        setErrorMessage('Incorrect email or password');
        setTimeout(() => setError(false), '5' * '1000');
      });
  };

  return (
    <SLoginWrapper>
      <SImg>
        <img
          src="https://images.pexels.com/photos/159291/beer-machine-alcohol-brewery-159291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="login imagem"
        />
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
              onChange={ ({ target: { name, value } }) => {
                verifyInputEmail();
                setUserState(name, value);
              } }
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
              onChange={ ({ target: { name, value } }) => setUserState(name, value) }
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
            style={ { backgroundColor: '#F9F871', color: 'black' } }
          >
            Login
          </button>
          <hr />
          <Link to="/register">
            <button
              type="button"
              data-testid="common_login__button-register"
              style={ { backgroundColor: '#E2B659', color: 'black' } }
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
