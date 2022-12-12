import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';

function AddUserForm({ errorHandler, usersTable }) {
  const { setDisplayError } = errorHandler;
  const { users, setUsers } = usersTable;

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const { username, email, password, role } = user;

  const setUserState = (name, value) => setUser({ ...user, [name]: value });

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
      setUser({
        username: '',
        email: '',
        password: '',
        role: 'customer',
      });
      setUsers([...users, user]);
    } catch (error) {
      const { message } = error.response.data;
      setDisplayError({ showError, message });
    }
  };

  return (
    <form>
      <label htmlFor="name">
        Nome:
        <input
          name="name"
          type="text"
          value={ username }
          onChange={ ({ target: { name, value } }) => setUserState(name, value) }
          data-testid="admin_manage__input-name"
        />
      </label>
      <label htmlFor="email">
        Email:
        <input
          name="email"
          type="text"
          value={ email }
          onChange={ ({ target: { name, value } }) => setUserState(name, value) }
          data-testid="admin_manage__input-email"
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          name="password"
          type="password"
          value={ password }
          onChange={ ({ target: { name, value } }) => setUserState(name, value) }
          data-testid="admin_manage__input-password"
        />
      </label>
      <label htmlFor="role">
        Tipo:
        <select
          name="role"
          data-testid="admin_manage__select-role"
          value={ role }
          onChange={ ({ target: { name, value } }) => setUserState(name, value) }
        >
          <option value="customer">Cliente</option>
          <option value="seller">Vendedor</option>
          <option value="administrator">Administrador</option>
        </select>
      </label>
      <button
        type="button"
        data-testid="admin_manage__button-register"
        onClick={ () => handleClick() }
        disabled={
          user.name.length < '12'
          || !/\S+@\w+\.\w+/i.test(user.email)
          || user.password.length < '6'
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
