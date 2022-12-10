import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import addUserFormDataTestIds from './data-testids';

function AddUserForm({ errorHandler, usersTable }) {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const MIN_LENGTH_NAME = 12;
  const MIN_LENGTH_PASS = 6;
  const EMAIL_REGEX = /\S+@\w+\.\w+/i;

  const handleChange = ({ target: { value, name } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleClick = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    try {
      await axios.post('http://localhost:3001/user/register', {
        ...user,
      }, {
        headers: {
          authorization: token,
        },
      });

      setUser({ name: '', email: '', password: '', role: 'customer' });
      usersTable.setUsers([...usersTable.users, user]);
    } catch (error) {
      const { message } = error.response.data;
      errorHandler.setDisplayError({ showError: true, message });
    }
  };

  return (
    <form>
      <label htmlFor="name">
        Nome:
        <input
          name="name"
          type="text"
          value={ user.name }
          onChange={ handleChange }
          data-testid={ addUserFormDataTestIds.inputName }
        />
      </label>
      <label htmlFor="email">
        Email:
        <input
          name="email"
          type="text"
          value={ user.email }
          onChange={ handleChange }
          data-testid={ addUserFormDataTestIds.inputEmail }
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          name="password"
          type="password"
          value={ user.password }
          onChange={ handleChange }
          data-testid={ addUserFormDataTestIds.inputPass }
        />
      </label>
      <label htmlFor="role">
        Tipo:
        <select
          name="role"
          data-testid={ addUserFormDataTestIds.inputRole }
          value={ user.role }
          onChange={ handleChange }
        >
          <option value="customer">Cliente</option>
          <option value="seller">Vendedor</option>
          <option value="administrator">Administrador</option>
        </select>
      </label>
      <button
        type="button"
        data-testid={ addUserFormDataTestIds.registerButton }
        onClick={ handleClick }
        disabled={
          user.name.length < MIN_LENGTH_NAME
          || !EMAIL_REGEX.test(user.email)
          || user.password.length < MIN_LENGTH_PASS
        }
      >
        Cadastrar
      </button>
    </form>
  );
}

AddUserForm.propTypes = {
  errorHandler: PropTypes.shape({
    displayError: PropTypes.shape({
      showError: PropTypes.bool,
      message: PropTypes.string,
    }),
    setDisplayError: PropTypes.func,
  }).isRequired,
  usersTable: PropTypes.shape({
    users: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      role: PropTypes.string,
    })),
    setUsers: PropTypes.func,
  }).isRequired,
};
export default AddUserForm;
