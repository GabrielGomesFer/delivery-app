import axios from 'axios';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../../App';

import userLS from '../mocks/userLSMock';
import { saleOne } from '../mocks/saleIdMock';

jest.mock('axios');

describe('Test Products', () => {
  describe('Testa funcionamento da página de produtos', () => {
    it('add 2, go to checkout and finish', async () => {
      const { history } = renderWithRouter(<App />);
      localStorage.setItem('user', JSON.stringify(userLS));
      axios.get.mockImplementation(async () => Promise.resolve(
        { data: saleOne },
      ));

      history.push('/customer/orders/1');

      await Promise.all(saleOne.products.map(async ({ id }, i = 0) => {
        const itemNumber = await screen
          .findByTestId(`customer_order_details__element-order-table-item-number-${i}`);

        const tableName = await screen
          .findByTestId(`customer_order_details__element-order-table-name-${i}`);

        const tableQuantity = await screen
          .findByTestId(`customer_order_details__element-order-table-quantity-${i}`);

        const tableUnitPrice = await screen
          .findByTestId(`customer_order_details__element-order-table-unit-price-${i}`);

        const tableSubTotal = await screen
          .findByTestId(`customer_order_details__element-order-table-sub-total-${i}`);

        const totalPrice = await screen
          .findByTestId('customer_order_details__element-order-total-price');

        // const deliverystatus = await screen
        //   .findByTestId(
        //     `customer_order_details__element-order-details-label-delivery-status-${id}`,
        //   );

        expect(itemNumber).toBeInTheDocument();
        expect(tableName).toBeInTheDocument();
        expect(tableQuantity).toBeInTheDocument();
        expect(tableUnitPrice).toBeInTheDocument();
        expect(tableSubTotal).toBeInTheDocument();
        expect(totalPrice).toBeInTheDocument();
        // expect(deliverystatus).toBeInTheDocument();
      }));

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
