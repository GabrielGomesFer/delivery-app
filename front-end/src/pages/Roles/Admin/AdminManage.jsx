import { useState } from 'react';
import Header from '../../../components/Header';
import AddUserForm from '../../../components/Admin/AddUserForm/AddUserForm';
import ERROR_TEST_ID from './data-testids';
import { SAdminPageContainer } from './styles';

function AdminManage() {
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
      <AddUserForm errorHandler={ { displayError, setDisplayError } } />
    </SAdminPageContainer>
  );
}

export default AdminManage;
