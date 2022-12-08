import axios from 'axios';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../../App';

import validToken from '../mocks/token';
import { mockedProducts } from '../mocks/productsMocks';

jest.mock('axios');

describe('Test Products', () => {
  describe('Testa funcionamento da página de produtos', () => {
    it('add 2 remove 1 and go to checkout', () => {
      const { history } = renderWithRouter(<App />);
      // Storage.prototype.setItem = jest.fn();
      localStorage.setItem('token', JSON.stringify(validToken));

      // console.log('teste de log localstorage', JSON.parse(localStorage.getItem('token')));
      history.push('/customer/products');

      axios.get.mockImplementation(async () => Promise.resolve(
        { data: mockedProducts },
      ));

      const cardPrice = screen
        .queryByTestId('customer_products__element-card-price-<id>');

      const cardImage = screen
        .queryByTestId('customer_products__img-card-bg-image-<id>');

      const cardTitle = screen
        .queryByTestId('customer_products__element-card-title-<id>');

      const buttonCardRemove = screen
        .queryByTestId('customer_products__button-card-rm-item-<id>');

      const buttonCardAdd = screen
        .queryByTestId('customer_products__button-card-add-item-<id>');

      const itemQuantity = screen
        .queryByTestId('customer_products__input-card-quantity-<id>');

      const buttonCart = screen
        .queryByTestId('customer_products__button-cart');

      const buttonCheckout = screen
        .queryByTestId('customer_products__checkout-bottom-value');

      waitFor(() => expect(cardPrice).toBeInTheDocument());
      waitFor(() => expect(cardImage).toBeInTheDocument());
      waitFor(() => expect(cardTitle).toBeInTheDocument());
      waitFor(() => expect(buttonCardRemove).toBeInTheDocument());
      waitFor(() => expect(buttonCardAdd).toBeInTheDocument());
      waitFor(() => expect(itemQuantity).toBeInTheDocument());
      waitFor(() => expect(buttonCart).toBeInTheDocument());
      waitFor(() => expect(buttonCheckout).toBeInTheDocument());

      waitFor(() => userEvent.click(buttonCardAdd[0]));

      waitFor(() => expect(itemQuantity[0].value).to.be(1));

      waitFor(() => expect(buttonCheckout.value).to.be('4,49'));

      waitFor(() => userEvent.click(buttonCardAdd[0]));

      waitFor(() => expect(itemQuantity[0].value).to.be(2));

      waitFor(() => expect(buttonCheckout.value).to.be('9,98'));

      waitFor(() => userEvent.click(buttonCardRemove[0]));

      waitFor(() => expect(itemQuantity[0].value).to.be(1));

      waitFor(() => expect(buttonCheckout.value).to.be('4,49'));

      userEvent.click(buttonCart);

      waitFor(() => expect(history.location.pathname).toBe('/customer/checkout'));

      jest.clearAllMocks();
    });
  });
});
