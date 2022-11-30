import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SButtons, SContainer, SForm } from './styles';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SForm>
      <div>
        <p>IMAGEM DO APP</p>
        <p>NOME DO APP</p>
      </div>
      <SContainer>
        <label htmlFor="email">
          Email
          <input
            type="email"
            placeholder="digite o seu email"
            name="email"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
            data-testid="common_login__input-email"
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
        <Link to="/products">
          <button
            type="button"
            style={ { backgroundColor: '#E2B659' } }
            data-testid="common_login__button-login"
          >
            Login
          </button>
        </Link>
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
  );
}

export default Login;
