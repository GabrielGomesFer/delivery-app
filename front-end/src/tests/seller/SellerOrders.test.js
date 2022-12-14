import React from 'react';
import axios from 'axios';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../../App';

import sellerLS from '../mocks/sellerLSMock';
import sales from '../mocks/sales';
// import saleIdMock from '../mocks/saleIdMock';
import pendingSale from '../mocks/pendingSaleMock';

const saleEmTrasitoMock = {
  id: 2,
  userId: 3,
  sellerId: 2,
  totalPrice: '9.70',
  deliveryAddress: 'Rua heheheh',
  deliveryNumber: '123',
  saleDate: '2022-12-10T19:13:15.000Z',
  status: 'Em Trânsito',
  seller: {
    name: 'Fulana Pereira',
  },
  saleProducts: [
    {
      id: 1,
      name: 'Skol Lata 250ml',
      price: '2.20',
      urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Heineken 600ml',
      price: '7.50',
      urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
      quantity: 1,
    },
  ],
};

const salePreparandoMock = {
  id: 2,
  userId: 3,
  sellerId: 2,
  totalPrice: '9.70',
  deliveryAddress: 'Rua heheheh',
  deliveryNumber: '123',
  saleDate: '2022-12-10T19:13:15.000Z',
  status: 'Preparando',
  seller: {
    name: 'Fulana Pereira',
  },
  saleProducts: [
    {
      id: 1,
      name: 'Skol Lata 250ml',
      price: '2.20',
      urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Heineken 600ml',
      price: '7.50',
      urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
      quantity: 1,
    },
  ],
};

jest.mock('axios');

describe('página de register', () => {
  beforeEach(() => {
    localStorage.removeItem('user');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('testa a atualização de um pedido', async () => {
    const { history } = renderWithRouter(<App />);

    axios.post.mockResolvedValue({ data: sellerLS });
    axios.get.mockResolvedValue({ data: sales });

    const emailInput = screen.getByTestId('common_login__input-email');
    const passwordInput = screen.getByTestId('common_login__input-password');
    const loginButton = screen.getByTestId('common_login__button-login');
    userEvent.type(emailInput, 'fulana@deliveryapp.com');
    userEvent.type(passwordInput, 'fulana@123');
    userEvent.click(loginButton);

    await waitFor(() => expect(history.location.pathname).toBe('/seller/orders'));

    axios.get.mockResolvedValue({ data: pendingSale });

    userEvent.click(await screen.findByTestId('seller_orders__element-order-id-1'));
    await waitFor(() => expect(history.location.pathname).toBe('/seller/orders/1'));

    axios.get.mockResolvedValue({ data: sales });

    const idPedido = await screen
      .findByTestId('seller_order_details__element-order-details-label-order-id');

    expect(idPedido).toBeInTheDocument();

    const saleDate = await screen
      .findByTestId('seller_order_details__element-order-details-label-order-date');

    expect(saleDate).toBeInTheDocument();

    const deliveryStatus = await screen
      .findByTestId('seller_order_details__element-order-details-label-delivery-status');

    expect(deliveryStatus).toBeInTheDocument();

    const statusPrepararButton = await screen
      .findByTestId('seller_order_details__button-preparing-check');

    expect(statusPrepararButton).toBeInTheDocument();

    const statusEmTransitoButton = await screen
      .findByTestId('seller_order_details__button-dispatch-check');

    expect(statusEmTransitoButton).toBeInTheDocument();

    axios.put.mockResolvedValue({ data: salePreparandoMock });

    act(() => {
      userEvent.click(statusPrepararButton);
    });
    expect(statusPrepararButton).not.toBeDisabled();

    axios.put.mockResolvedValue({ data: saleEmTrasitoMock });

    await act(async () => {
      userEvent.click(await screen
        .findByTestId('seller_order_details__button-dispatch-check'));
    });
  });
});
