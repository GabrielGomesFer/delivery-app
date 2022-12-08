import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../../App';

describe('Teste aba Products', () => {
  describe('Testes header', () => {
    it('testa se trazem os dados corretamente para o header', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/customer/products');

      const productsButton = screen
        .getByTestId('customer_products__element-navbar-link-products');

      const cartButton = screen
        .getByTestId('customer_products__element-navbar-link-orders');

      const userName = screen
        .getByTestId('customer_products__element-navbar-user-full-name');

      const logOut = screen
        .getByTestId('customer_products__element-navbar-link-logout');

      expect(productsButton).toBeInTheDocument();
      expect(cartButton).toBeInTheDocument();
      expect(userName).toBeInTheDocument();
      expect(logOut).toBeInTheDocument();

      userEvent.click(cartButton);

      expect(history.location.pathname).toBe('/customer/orders');

      userEvent.click(productsButton);

      expect(history.location.pathname).toBe('/customer/products');

      userEvent.click(logOut);

      Storage.prototype.setItem = jest.fn();
      localStorage.setItem('user', JSON.stringify('teste@teste.com', 'cliente'));

      const afterLogoutLS = JSON.parse(localStorage.getItem('user'));

      expect(afterLogoutLS).toBeNull();
      expect(history.location.pathname).toBe('/login');
    });
  });
});
