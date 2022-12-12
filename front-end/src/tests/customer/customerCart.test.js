import axios from 'axios';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../../App';

import userLS from '../mocks/userLSMock';
import { mockedProducts } from '../mocks/productsMocks';
import { cartMock } from '../mocks/cartMock';

jest.mock('axios');

describe('Test Products', () => {
  describe('Testa funcionamento da página de produtos', () => {
    it('add 2, go to checkout and finish', async () => {
      const { history } = renderWithRouter(<App />);
      localStorage.setItem('user', JSON.stringify(userLS));
      axios.get.mockImplementation(async () => Promise.resolve(
        { data: mockedProducts },
      ));
      axios.post.mockImplementation(() => Promise.resolve(
        { data: cartMock },
      ));

      history.push('/customer/products');

      await Promise.all(mockedProducts.map(async ({ id }) => {
        const buttonCardAdd = await screen
          .findByTestId(`customer_products__button-card-add-item-${id}`);

        const itemQuantity = await screen
          .findByTestId(`customer_products__input-card-quantity-${id}`);

        const buttonCart = await screen
          .findByTestId('customer_products__button-cart');

        const buttonCheckout = await screen
          .findByTestId('customer_products__checkout-bottom-value');

        expect(buttonCardAdd).toBeInTheDocument();
        expect(itemQuantity).toBeInTheDocument();
        expect(buttonCart).toBeInTheDocument();
        expect(buttonCheckout).toBeInTheDocument();
      }));

      userEvent.click(screen
        .getByTestId('customer_products__button-card-add-item-1'));

      waitFor(() => expect(screen
        .getByTestId('customer_products__input-card-quantity-1').value).toBe(1));

      userEvent.click(screen
        .getByTestId('customer_products__button-card-add-item-1'));

      waitFor(() => expect(screen
        .getByTestId('customer_products__input-card-quantity-1').value).toBe(2));

      // waitFor(() => expect(buttonCheckout.value).toBe('2,20'));

      // waitFor(() => userEvent.click(buttonCardAdd[0]));

      // waitFor(() => expect(itemQuantity[0].value).toBe(2));

      waitFor(() => expect(screen
        .getByTestId('customer_products__checkout-bottom-value').value).toBe('R$ 4,40'));

      userEvent.click(screen.getByTestId('customer_products__button-cart'));
      // waitFor(() => expect(buttonCheckout).toBeInTheDocument());
      // console.log(buttonCardAdd);

      await waitFor(() => {
        expect(history.location.pathname).toBe('/customer/checkout');
      });

      const address = await screen.findByTestId('customer_checkout__input-address');

      const deliveryNumber = await screen
        .findByTestId('customer_checkout__input-address-number');

      waitFor(() => expect(address).toBeInTheDocument());
      waitFor(() => expect(deliveryNumber).toBeInTheDocument());

      waitFor(() => userEvent.type(address, 'rua da pinga'));
      waitFor(() => userEvent.type(deliveryNumber, '51'));

      const finishOrder = await screen
        .findByTestId('customer_checkout__button-submit-order');

      waitFor(() => expect(finishOrder).toBeInTheDocument());
      waitFor(() => userEvent.click(finishOrder));

      waitFor(() => expect(history.location.pathname).toBe('/customer/orders/1'));
      jest.clearAllMocks();
    });
  });
});
