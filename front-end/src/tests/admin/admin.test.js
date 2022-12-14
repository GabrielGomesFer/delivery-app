import React from 'react';
import axios from 'axios';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../../App';

import allUsersMock from '../mocks/allUsers';

jest.mock('axios');

const adminLoginMock = {
  name: 'Delivery App Admin',
  email: 'adm@deliveryapp.com',
  role: 'administrator',
  token: 'eyBi75eT8uJnSbfadNE',
};

describe('página de administrador', () => {
  beforeEach(() => {
    localStorage.removeItem('user');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('testa a atualização de um pedido', async () => {
    const { history } = renderWithRouter(<App />);

    axios.post.mockResolvedValue({ data: adminLoginMock });
    axios.get.mockResolvedValue({ data: allUsersMock });

    const emailInput = screen.getByTestId('common_login__input-email');
    const passwordInput = screen.getByTestId('common_login__input-password');
    const loginButton = screen.getByTestId('common_login__button-login');
    userEvent.type(emailInput, 'adm@deliveryapp.com');
    userEvent.type(passwordInput, '--adm2@21!!--');
    userEvent.click(loginButton);

    await waitFor(() => expect(history.location.pathname).toBe('/admin/manage'));

    const nameAdminInput = await screen.findByTestId(
      'admin_manage__input-name',
    );
    expect(nameAdminInput).toBeInTheDocument();
    userEvent.type(
      nameAdminInput,
      'meu nome valido gigantesco para passar no teste',
    );

    const emailAdminInput = await screen.findByTestId(
      'admin_manage__input-email',
    );
    expect(emailAdminInput).toBeInTheDocument();
    userEvent.type(emailAdminInput, 'meuemail@email.com');

    const passwordAdminInput = await screen.findByTestId(
      'admin_manage__input-password',
    );
    expect(passwordAdminInput).toBeInTheDocument();
    userEvent.type(passwordAdminInput, 'minhaSenhaValida');

    const roleAdminInput = await screen.findByTestId(
      'admin_manage__select-role',
    );
    expect(roleAdminInput).toBeInTheDocument();
    userEvent.selectOptions(roleAdminInput, 'seller');

    const registerAdminButton = await screen.findByTestId(
      'admin_manage__button-register',
    );
    expect(registerAdminButton).toBeInTheDocument();

    axios.post.mockRejectedValue({
      status: 409,
      response: { data: { message: 'error' } },
    });
    userEvent.click(registerAdminButton);

    const errorMessage = await screen.findByTestId(
      'admin_manage__element-invalid-register',
    );
    expect(errorMessage).toBeInTheDocument();

    axios.post.mockResolvedValue({ data: adminLoginMock });
    axios.get.mockResolvedValue({ data: allUsersMock });
    userEvent.click(await screen.findByTestId('admin_manage__button-register'));

    axios.delete.mockRejectedValue({
      status: 409,
      response: { data: { message: 'error' } },
    });
    userEvent.click(
      await screen.findByTestId('admin_manage__element-user-table-remove-0'),
    );

    axios.delete.mockResolvedValue({ status: 209 });
    userEvent.click(
      await screen.findByTestId('admin_manage__element-user-table-remove-0'),
    );
  });
});
