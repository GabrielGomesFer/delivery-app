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
} from '../Login/styles';

function Register() {
  const history = useHistory();
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const { username, email, password } = user;

  const setUserState = (name, value) => setUser({ ...user, [name]: value });

  const verifyInputEmail = () => {
    const regexValidation = /\S+@\w+\.\w+/i;
    const finalValidation = regexValidation.test(email);
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
        localStorage.setItem('user', JSON.stringify({
          token,
          role,
          email: bEmail,
          name,
        }));
        history.push('/customer/products');
      })
      .catch((err) => {
        setUser({
          username: '',
          email: '',
          password: '',
        });
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
        <h1>Faça o cadastro de uma nova conta</h1>
        {error && (
          <SError>
            <Warning size={ 22 } />
            <p
              data-testid="common_register__element-invalid_register"
            >
              {errorMessage ?? 'Usuário e senha inválidos!'}
            </p>
          </SError>
        )}
        <SLoginLabel>
          <label htmlFor="name">
            <p>Nome</p>
            <input
              type="text"
              placeholder="digite o seu nome"
              name="username"
              value={ username }
              onChange={ ({ target: { name, value } }) => setUserState(name, value) }
              data-testid="common_register__input-name"
              autoComplete="off"
            />
          </label>

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
              data-testid="common_register__input-email"
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
              data-testid="common_register__input-password"
            />
          </label>
        </SLoginLabel>
        <SLoginButtons>
          <button
            type="button"
            data-testid="common_register__button-register"
            disabled={ !disable || password.length < '6' || username.length < '12' }
            onClick={ () => verifyError() }
            style={ { backgroundColor: '#8b5cf6' } }
          >
            Cadastrar
          </button>
          <hr />
          <Link to="/login">
            <button
              type="button"
              style={ { backgroundColor: '#ec2323' } }
            >
              Já tenho uma conta
            </button>
          </Link>
        </SLoginButtons>
      </SLoginForm>
    </SLoginWrapper>
  );
}

export default Register;
