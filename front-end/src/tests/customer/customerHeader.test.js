import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../../App';

describe('Teste aba Products', () => {
  describe('Testes header', () => {
    it('testa se trazem os dados corretamente para o header', async () => {
      const { history } = renderWithRouter(<App />);

      const inputEmail = screen.getByTestId('common_login__input-email');
      const inputPassword = screen.getByTestId('common_login__input-password');
      const button = screen.getByTestId('common_login__button-login');

      expect(inputEmail).toBeInTheDocument();
      expect(inputPassword).toBeInTheDocument();
      expect(button).toBeInTheDocument();

      userEvent.type(inputEmail, 'zebirita@email.com');
      userEvent.type(inputPassword, '$#zebirita#$');

      userEvent.click(button);

      // localStorage.setItem('user', JSON.stringify(userLS));

      // history.push('/customer/products');

      await waitFor(() => {
        expect(history.location.pathname).toBe('/customer/products');
      });

      const productsButton = await screen
        .findByTestId('customer_products__element-navbar-link-products');

      const userName = await screen
        .findByTestId('customer_products__element-navbar-user-full-name');

      const logOut = await screen
        .findByTestId('customer_products__element-navbar-link-logout');

      const ordersButton = await screen
        .findByTestId('customer_products__element-navbar-link-orders');

      expect(productsButton).toBeInTheDocument();
      expect(ordersButton).toBeInTheDocument();
      expect(userName).toBeInTheDocument();
      expect(logOut).toBeInTheDocument();

      userEvent.click(ordersButton);

      waitFor(() => expect(history.location.pathname).toBe('/customer/orders'));

      userEvent.click(productsButton);

      expect(history.location.pathname).toBe('/customer/products');

      userEvent.click(logOut);

      // Storage.prototype.setItem = jest.fn();
      // localStorage.setItem('user', JSON.stringify('teste@teste.com', 'cliente'));
      const afterLogoutLS = JSON.parse(localStorage.getItem('user'));

      expect(afterLogoutLS).toBeNull();
      expect(history.location.pathname).toBe('/login');

      jest.clearAllMocks();
    });
  });
});
