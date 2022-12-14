import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import userLS from './mocks/userLSMock';
import sellerLS from './mocks/sellerLSMock';
import admLS from './mocks/admLSMock';

describe('Teste Componente', () => {
  const userFullName = 'customer_products__element-navbar-user-full-name';
  const logoutButton = 'customer_products__element-navbar-link-logout';

  describe('Testes header', () => {
    it('testa se trazem os dados corretamente para o header de adm', async () => {
      const { history } = renderWithRouter(<App />);

      localStorage.setItem('user', JSON.stringify(admLS));

      history.push('/');

      await waitFor(() => {
        expect(history.location.pathname).toBe('/admin/manage');
      });

      const userName = await screen
        .findByTestId(userFullName);

      const logOut = await screen
        .findByTestId(logoutButton);

      expect(userName).toBeInTheDocument();
      expect(logOut).toBeInTheDocument();

      userEvent.click(logOut);

      expect(history.location.pathname).toBe('/login');

      jest.clearAllMocks();
    });

    it('testa se trazem os dados corretamente para o header de seller', async () => {
      const { history } = renderWithRouter(<App />);

      localStorage.setItem('user', JSON.stringify(sellerLS));

      history.push('/');

      await waitFor(() => {
        expect(history.location.pathname).toBe('/seller/orders');
      });

      const userName = await screen
        .findByTestId(userFullName);

      const logOut = await screen
        .findByTestId(logoutButton);

      const ordersButton = await screen
        .findByTestId('customer_products__element-navbar-link-orders');

      expect(ordersButton).toBeInTheDocument();
      expect(userName).toBeInTheDocument();
      expect(logOut).toBeInTheDocument();

      userEvent.click(ordersButton);

      waitFor(() => expect(history.location.pathname).toBe('/seller/orders'));

      userEvent.click(logOut);

      expect(history.location.pathname).toBe('/login');

      jest.clearAllMocks();
    });

    it('testa se trazem os dados corretamente para o header de customer', async () => {
      const { history } = renderWithRouter(<App />);

      localStorage.setItem('user', JSON.stringify(userLS));

      history.push('/');

      await waitFor(() => {
        expect(history.location.pathname).toBe('/customer/products');
      });

      const productsButton = await screen
        .findByTestId('customer_products__element-navbar-link-products');

      const userName = await screen
        .findByTestId(userFullName);

      const logOut = await screen
        .findByTestId(logoutButton);

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

      expect(history.location.pathname).toBe('/login');

      jest.clearAllMocks();
    });
  });
});
