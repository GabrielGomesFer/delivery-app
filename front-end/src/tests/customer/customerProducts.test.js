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

      const cardPrice = screen
        .queryByTestId('customer_products__element-card-price-<id>');

      const cardImage = screen
        .queryByTestId('customer_products__img-card-bg-image-<id>');

      const cardTitle = screen
        .getByTestId('customer_products__element-card-title-<id>');

      const buttonCardRemove = screen
        .getByTestId('customer_products__button-card-rm-item-<id>');

      const buttonCardAdd = screen
        .getByTestId('customer_products__button-card-add-item-<id>');

      const itemQuantity = screen
        .getByTestId('customer_products__input-card-quantity-<id>');

      const buttonCart = screen
        .getByTestId('customer_products__button-cart');

      const buttonCheckout = screen
        .getByTestId('customer_products__checkout-bottom-value');

      expect(cardPrice).toBeInTheDocument();
      expect(cardImage).toBeInTheDocument();
      expect(cardTitle).toBeInTheDocument();
      expect(buttonCardRemove).toBeInTheDocument();
      expect(buttonCardAdd).toBeInTheDocument();
      expect(itemQuantity).toBeInTheDocument();
      expect(buttonCart).toBeInTheDocument();
      expect(buttonCheckout).toBeInTheDocument();

      userEvent.click(buttonCardAdd[0]);

      expect(itemQuantity[0].value).to.be(1);

      expect(buttonCheckout.value).to.be('4,49');

      userEvent.click(buttonCardAdd[0]);

      expect(itemQuantity[0].value).to.be(2);

      expect(buttonCheckout.value).to.be('9,98');

      userEvent.click(buttonCardRemove[0]);

      expect(itemQuantity[0].value).to.be(1);

      expect(buttonCheckout.value).to.be('4,49');

      userEvent.click(buttonCart);

      waitFor(() => expect(history.location.pathname).toBe('/customer/checkout'));
    });
  });
});
