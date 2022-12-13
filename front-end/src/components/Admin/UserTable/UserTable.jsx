import axios from 'axios';
import { Trash } from 'phosphor-react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { STable } from '../../../pages/Roles/Customer/Checkout/styles';
import { SCheckout } from '../../Customer/CheckoutProducts/styles';

function UserTable({ usersState }) {
  const { users, setUsers } = usersState;

  const { token } = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/user', {
          headers: {
            authorization: token,
          },
        });
        const dbUsers = data.filter(({ role }) => role !== 'administrator');
        setUsers(dbUsers);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUsers();
  }, [setUsers, token]);

  const handleClick = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/user/${userId}`, {
        headers: {
          authorization: token,
        },
      });
      const newUserList = await users.filter(({ id }) => id !== userId);
      setUsers(newUserList);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <STable>
      <thead>
        <tr>
          <th>Item</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Tipo</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, name, email, role }, i) => (
          <SCheckout key={ i }>
            <td
              data-testid={ `admin_manage__element-user-table-item-number-${i}` }
            >
              { i + 1 }
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-name-${i}` }
            >
              { name }
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-email-${i}` }
            >
              { email }
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-role-${i}` }
            >
              { role }
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-remove-${i}` }
            >
              <button
                type="button"
                onClick={ () => handleClick(id) }
              >
                <Trash size={ 20 } color="#ff0000" style={ { cursor: 'pointer' } } />
              </button>
            </td>
          </SCheckout>
        ))}
      </tbody>
    </STable>
  );
}

UserTable.propTypes = {
  usersState: PropTypes.shape({
    users: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      role: PropTypes.string,
    })).isRequired,
    setUsers: PropTypes.func.isRequired,
  }).isRequired,

};

export default UserTable;
