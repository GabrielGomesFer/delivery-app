import { useState } from 'react';
import Header from '../../../components/Header';
import AddUserForm from '../../../components/Admin/AddUserForm/AddUserForm';
import ERROR_TEST_ID from './data-testids';
import { SAdminPageContainer } from './styles';
import UserTable from '../../../components/Admin/UserTable/UserTable';

function AdminManage() {
  const [users, setUsers] = useState([]);
  const [displayError, setDisplayError] = useState({
    showError: false,
    message: '',
  });

  return (
    <SAdminPageContainer>
      <Header title="Produtos" url="/admin/manage" />
      { displayError.showError && (
        <span data-testid={ ERROR_TEST_ID }>{ displayError.message }</span>
      )}
      <AddUserForm
        errorHandler={ { displayError, setDisplayError } }
        usersTable={ { users, setUsers } }
      />
      <UserTable users={ users } setUsers={ setUsers } />
    </SAdminPageContainer>
  );
}

export default AdminManage;
