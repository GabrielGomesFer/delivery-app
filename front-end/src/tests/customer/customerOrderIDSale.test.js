import axios from 'axios';
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../../App';

import userLS from '../mocks/userLSMock';
import saleOne from '../mocks/saleIdMock';

jest.mock('axios');

const ArrivedSale = {
  id: 1,
  totalPrice: '0.00',
  saleDate: '2022-12-06T21:09:06.000Z',
  status: 'Entregue',
  seller: {
    id: 1,
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    role: 'administrator',
  },
  products: [
    {
      id: 1,
      name: 'Skol Lata 250ml',
      price: '2.20',
      urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      SaleProduct: {
        quantity: 2,
      },
    },
    {
      id: 2,
      name: 'Heineken 600ml',
      price: '7.50',
      urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
      SaleProduct: {
        quantity: 5,
      },
    },
    {
      id: 4,
      name: 'Brahma 600ml',
      price: '7.50',
      urlImage: 'http://localhost:3001/images/brahma_600ml.jpg',
      SaleProduct: {
        quantity: 1,
      },
    },
  ],
};

describe('Test Products', () => {
  describe('Testa funcionamento da página de produtos', () => {
    it('add 2, go to checkout and finish', async () => {
      axios.get.mockImplementation(() => Promise.resolve(
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

      let deliverystatus = await screen
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

      // console.log(deliverystatus);
      // expect(deliverystatus.value).toBe('Em trânsito');

      const orderId = await screen
        .findByTestId('customer_order_details__element-order-details-label-order-id');

      const sellerName = await screen
        .findByTestId('customer_order_details__element-order-details-label-seller-name');

      const deliverycheck = await screen
        .findByTestId('customer_order_details__button-delivery-check');

      expect(orderId).toBeInTheDocument();
      expect(sellerName).toBeInTheDocument();
      expect(deliverycheck).toBeInTheDocument();

      axios.put.mockImplementation(async () => Promise.resolve(
        { data: ArrivedSale },
      ));

      expect(deliverycheck).not.toBeDisabled();

      userEvent.click(deliverycheck);

      deliverystatus = await screen
        .findByTestId(
          'customer_order_details__element-order-details-label-delivery-status',
        );

      jest.clearAllMocks();
    });
  });
});
