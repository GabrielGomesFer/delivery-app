import axios from 'axios';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../../App';
import sales from '../mocks/sales';
import { saleOne } from '../mocks/saleIdMock';

jest.mock('axios');

describe('Tests of orders page of customer', () => {
  beforeEach(() => {
    axios.get.mockImplementation(async () => Promise.resolve(
      { data: sales },
    ));
  });

  afterEach(() => jest.clearAllMocks());

  const PAGE_PATHNAME = '/customer/orders';

  it('Test if all elements are render in screen', async () => {
    const { history } = renderWithRouter(<App />);

    history.push(PAGE_PATHNAME);

    await waitFor(() => expect(history.location.pathname).toBe(PAGE_PATHNAME));

    await Promise.all(sales.map(async ({ id }) => {
      expect(await screen
        .findByTestId(`customer_orders__element-order-id-${id}`)).toBeInTheDocument();
      expect(await screen
        .findByTestId(`customer_orders__element-delivery-status-${id}`))
        .toBeInTheDocument();
      expect(await screen
        .findByTestId(`customer_orders__element-card-price-${id}`)).toBeInTheDocument();
      expect(await screen
        .findByTestId(`customer_orders__element-order-date-${id}`)).toBeInTheDocument();
    }));
  });

  it('Test if user is redirected to order details', async () => {
    const { history } = renderWithRouter(<App />);

    history.push(PAGE_PATHNAME);

    await waitFor(() => expect(history.location.pathname).toBe(PAGE_PATHNAME));

    const orderCard = await findAllByRole('link');

    jest.clearAllMocks();
    axios.get.mockImplementation(async () => Promise.resolve(
      { data: saleOne },
    ));

    userEvent.click(orderCard[0]);

    await waitFor(() => expect(history.location.pathname)
      .ToBe(`${PAGE_PATHNAME}/${sales[0].id}`));
  });
});
