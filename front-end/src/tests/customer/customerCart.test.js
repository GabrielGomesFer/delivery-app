import axios from 'axios';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../../App';
import userLS from '../mocks/userLSMock';
import { mockedProducts } from '../mocks/productsMocks';
import saleOne from '../mocks/saleIdMock';

jest.mock('axios');

describe('Test Checkout', () => {
  describe('Testa funcionamento da página de checkout', () => {
    it('Test of the user can finish a order', async () => {
      axios.get.mockImplementation(async () => Promise.resolve(
        { data: mockedProducts },
      ));
      axios.post.mockImplementation(() => Promise.resolve(
        { data: { saleId: 1 } },
      ));

      localStorage.setItem('user', JSON.stringify(userLS));
      const { history } = renderWithRouter(<App />);

      history.push('/customer/checkout');
      expect(history.location.pathname).toBe('/customer/checkout');

      const address = await screen.findByTestId('customer_checkout__input-address');
      const deliveryNumber = await screen
        .findByTestId('customer_checkout__input-address-number');

      expect(address).toBeInTheDocument();
      expect(deliveryNumber).toBeInTheDocument();

      userEvent.type(address, 'rua da pinga');
      userEvent.type(deliveryNumber, '51');

      const finishOrder = await screen
        .findByTestId('customer_checkout__button-submit-order');

      expect(finishOrder).toBeInTheDocument();

      axios.get.mockImplementation(async () => Promise.resolve(
        { data: saleOne },
      ));

      userEvent.click(finishOrder);

      await waitFor(() => expect(history.location.pathname).toBe('/customer/orders/1'));
      jest.clearAllMocks();
    });
  });
});
