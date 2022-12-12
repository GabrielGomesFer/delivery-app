import { useState } from 'react';
import AddUserForm from '../../../components/Admin/AddUserForm/AddUserForm';
import UserTable from '../../../components/Admin/UserTable/UserTable';
import Header from '../../../components/Header';
import { SAdminPage, SAdminPageForm, SAdminPageTable } from './styles';

function AdminManage() {
  const [users, setUsers] = useState([]);
  const [displayError, setDisplayError] = useState({
    showError: false,
    message: '',
  });
  const { showError, message } = displayError;

  return (
    <>
      <Header title="Produtos" url="/admin/manage" />
      {showError && (
        <span
          data-testid="admin_manage__element-invalid-register"
        >
          { message }
        </span>
      )}
      <SAdminPage>
        <SAdminPageForm>
          <AddUserForm
            errorHandler={ { setDisplayError } }
            usersTable={ { users, setUsers } }
          />
        </SAdminPageForm>
        <SAdminPageTable>
          <UserTable
            usersState={ { users, setUsers } }
          />
        </SAdminPageTable>
      </SAdminPage>
    </>
  );
}

export default AdminManage;
