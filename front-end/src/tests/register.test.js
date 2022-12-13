import axios from 'axios';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

import { mockedProducts } from './mocks/productsMocks';

jest.mock('axios');

describe('Testa a página de Registro', () => {
  it('Verifica funcionalidade do Registro', async () => {
    axios.post.mockImplementation(async () => Promise.resolve(
      {
        data: {
          name: 'user',
          email: 'user@user.com',
          role: 'customer',
          token: 'IsI9.eyJyc2VsbGVyIiwiZW',
        },
      },
    ));

    const { history } = renderWithRouter(<App />);
    history.push('/register');

    const inputName = screen.getByTestId('common_register__input-name');
    const inputEmail = screen.getByTestId('common_register__input-email');
    const inputPassword = screen.getByTestId('common_register__input-password');

    const button = screen.getByTestId('common_register__button-register');

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    expect(button).toBeDisabled();

    userEvent.type(inputName, 'Cliente de teste');

    expect(button).toBeDisabled();

    userEvent.type(inputEmail, 'cliente@teste.com');

    expect(button).toBeDisabled();

    userEvent.type(inputPassword, '12345566');

    expect(button).not.toBeDisabled();

    axios.get.mockImplementation(() => Promise.resolve(
      { data: mockedProducts },
    ));

    userEvent.click(button);

    await waitFor(() => expect(history.location.pathname).toBe('/customer/products'));

    jest.clearAllMocks();
  });

  it('Testa se mensagem de erro aparece', async () => {
    localStorage.clear();
    axios.post.mockImplementation(async () => new Error('User already registered'));

    const { history } = renderWithRouter(<App />);
    history.push('/register');

    const inputName = screen.getByTestId('common_register__input-name');
    const inputEmail = screen.getByTestId('common_register__input-email');
    const inputPassword = screen.getByTestId('common_register__input-password');
    const button = screen.getByTestId('common_register__button-register');

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    expect(button).toBeDisabled();

    userEvent.type(inputName, 'Cliente de teste');

    expect(button).toBeDisabled();

    userEvent.type(inputEmail, 'zebirita@email.com');

    expect(button).toBeDisabled();

    userEvent.type(inputPassword, '1234567');

    expect(button).not.toBeDisabled();

    userEvent.click(button);

    const errorMessage = screen
      .queryByTestId('common_register__element-invalid_register');
    waitFor(() => expect(errorMessage).toBeInTheDocument());

    jest.clearAllMocks();
  });
});
