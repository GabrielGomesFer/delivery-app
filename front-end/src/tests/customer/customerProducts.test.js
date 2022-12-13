import axios from 'axios';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../../App';
import userLS from '../mocks/userLSMock';
import { mockedProducts } from '../mocks/productsMocks';

jest.mock('axios');

describe('Test Products', () => {
  describe('Testa funcionamento da página de produtos', () => {
    beforeEach(() => {
      axios.get.mockImplementation(async () => Promise.resolve(
        { data: mockedProducts },
      ));
    });

    afterEach(() => jest.clearAllMocks());
    it('Test if elements are render', async () => {
      const { history } = renderWithRouter(<App />);
      localStorage.setItem('user', JSON.stringify(userLS));

      history.push('/');

      const randomNumber = () => Math
        .floor((Math.random() * mockedProducts.length) + 1);

      const cardPrice = await screen
        .findByTestId(`customer_products__element-card-price-${randomNumber()}`);
      const cardImage = await screen
        .findByTestId(`customer_products__img-card-bg-image-${randomNumber()}`);
      const cardTitle = await screen
        .findByTestId(`customer_products__element-card-title-${randomNumber()}`);
      const buttonCardRemove = await screen
        .findByTestId(`customer_products__button-card-rm-item-${randomNumber()}`);
      const buttonCardAdd = await screen
        .findByTestId(`customer_products__button-card-add-item-${randomNumber()}`);
      const itemQuantity = await screen
        .findByTestId(`customer_products__input-card-quantity-${randomNumber()}`);
      const buttonCart = await screen
        .findByTestId('customer_products__button-cart');
      const buttonCheckout = await screen
        .findByTestId('customer_products__checkout-bottom-value');

      expect(cardPrice).toBeInTheDocument();
      expect(cardImage).toBeInTheDocument();
      expect(cardTitle).toBeInTheDocument();
      expect(buttonCardRemove).toBeInTheDocument();
      expect(buttonCardAdd).toBeInTheDocument();
      expect(itemQuantity).toBeInTheDocument();
      expect(buttonCart).toBeInTheDocument();
      expect(buttonCheckout).toBeInTheDocument();
    });

    it('Test buttons of products', async () => {
      const { history } = renderWithRouter(<App />);
      localStorage.setItem('user', JSON.stringify(userLS));

      history.push('/');

      const buttonCardAdd = await screen
        .findByTestId('customer_products__button-card-add-item-1');
      const buttonCardRemove = await screen
        .findByTestId('customer_products__button-card-rm-item-1');
      const itemQuantity = await screen
        .findByTestId('customer_products__input-card-quantity-1');
      const buttonCheckout = await screen
        .findByTestId('customer_products__checkout-bottom-value');

      expect(buttonCheckout.innerHTML).toBe('R$&nbsp;0,00');

      userEvent.click(buttonCardAdd);
      userEvent.click(buttonCardAdd);
      userEvent.click(buttonCardAdd);

      userEvent.click(buttonCardRemove);

      expect(itemQuantity.value).toBe('2');

      expect(buttonCheckout.innerHTML).toBe('R$&nbsp;4,40');

      const buttonCart = await screen
        .findByTestId('customer_products__button-cart');

      userEvent.click(buttonCart);

      waitFor(() => expect(history.location.pathname).toBe('/customer/checkout'));
    });
  });
});
