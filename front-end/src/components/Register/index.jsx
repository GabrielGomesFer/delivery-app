import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SButtons, SContainer, SForm } from './styles';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SForm>
      <p>CADASTRO</p>
      <SContainer>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            placeholder="digite o seu nome"
            name="name"
            value={ name }
            onChange={ ({ target: { value } }) => setName(value) }
            data-testid="common_register__input-name"
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            type="email"
            placeholder="digite o seu email"
            name="email"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
            data-testid="common_register__input-email"
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
        <Link to="/products">
          <button
            type="button"
            data-testid="common_register__button-register"
            style={ { backgroundColor: '#E2B659' } }
          >
            Cadastrar
          </button>
        </Link>
      </SButtons>
    </SForm>
  );
}

export default Register;
