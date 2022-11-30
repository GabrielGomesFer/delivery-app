import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SButtons, SContainer, SForm } from './styles';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(true);

  const verifyInputEmail = ({ target: { value } }) => {
    const regexValidation = /\S+@\w+\.\w+/i;
    const finalValidation = regexValidation.test(email);
    setEmail(value);
    setDisable(finalValidation);
  };

  return (
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
        <Link to="/customer/products">
          <button
            type="button"
            style={ { backgroundColor: '#E2B659' } }
            data-testid="common_login__button-login"
            disabled={ !disable || password.length <= '6' }
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
