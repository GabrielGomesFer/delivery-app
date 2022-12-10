import { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import userTableTestIds from './date-testids';

function UserTable({ users, setUsers }) {
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
        console.log(error);
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

      const newUserList = users.filter(({ id }) => id !== userId);
      setUsers(newUserList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <table>
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
        {
          users.map(({ id, name, email, role }, i) => (
            <tr key={ i }>
              <td data-testid={ `${userTableTestIds.tableItem}${i}` }>{ i + 1 }</td>
              <td data-testid={ `${userTableTestIds.tableName}${i}` }>{ name }</td>
              <td data-testid={ `${userTableTestIds.tableEmail}${i}` }>{ email }</td>
              <td data-testid={ `${userTableTestIds.tableRole}${i}` }>{ role }</td>
              <td data-testid={ `${userTableTestIds.tableRm}${i}` }>
                <button
                  type="button"
                  onClick={ () => handleClick(id) }
                >
                  Excluir

                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

UserTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  })).isRequired,
  setUsers: PropTypes.func.isRequired,

};

export default UserTable;
