import axios from 'axios';
import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../../App';

import userLS from '../mocks/userLSMock';
import saleOne from '../mocks/saleIdMock';

jest.mock('axios');

describe('Test Products', () => {
  describe('Testa funcionamento da página de produtos', () => {
    it('add 2, go to checkout and finish', async () => {
      axios.get.mockImplementation(async () => Promise.resolve(
        { data: saleOne },
      ));

      localStorage.setItem('user', JSON.stringify(userLS));
      const { history } = renderWithRouter(<App />);

      history.push('/customer/orders/1');

      const randomNumber = () => Math
        .floor((Math.random() * saleOne.products.length));

      const itemNumber = await screen
        .findByTestId(
          `customer_order_details__element-order-table-item-number-${randomNumber()}`,
        );

      const tableName = await screen
        .findByTestId(
          `customer_order_details__element-order-table-name-${randomNumber()}`,
        );

      const tableQuantity = await screen
        .findByTestId(
          `customer_order_details__element-order-table-quantity-${randomNumber()}`,
        );

      const tableUnitPrice = await screen
        .findByTestId(
          `customer_order_details__element-order-table-unit-price-${randomNumber()}`,
        );

      const tableSubTotal = await screen
        .findByTestId(
          `customer_order_details__element-order-table-sub-total-${randomNumber()}`,
        );

      const totalPrice = await screen
        .findByTestId('customer_order_details__element-order-total-price');

      const deliverystatus = await screen
        .findByTestId(
          'customer_order_details__element-order-details-label-delivery-status',
        );

      expect(itemNumber).toBeInTheDocument();
      expect(tableName).toBeInTheDocument();
      expect(tableQuantity).toBeInTheDocument();
      expect(tableUnitPrice).toBeInTheDocument();
      expect(tableSubTotal).toBeInTheDocument();
      expect(totalPrice).toBeInTheDocument();
      expect(deliverystatus).toBeInTheDocument();

      const orderId = await screen
        .findByTestId('customer_order_details__element-order-details-label-order-id');

      const sellerName = await screen
        .findByTestId('customer_order_details__element-order-details-label-seller-name');

      const deliverycheck = await screen
        .findByTestId('customer_order_details__button-delivery-check');

      expect(orderId).toBeInTheDocument();
      expect(sellerName).toBeInTheDocument();
      expect(deliverycheck).toBeInTheDocument();

      jest.clearAllMocks();
    });
  });
});
