import axios from 'axios';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import { mockedProducts } from './mocks/productsMocks';

jest.mock('axios');
describe('Testa a página de login', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica funcionalidade do login', async () => {
    axios.post.mockImplementation(async () => Promise.resolve({
      data: {
        name: 'user',
        email: 'user@user.com',
        role: 'customer',
        token: 'IsI9.eyJyc2VsbGVyIiwiZW',
      },
    }));

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('common_login__input-email');
    const inputPassword = screen.getByTestId('common_login__input-password');
    const button = screen.getByTestId('common_login__button-login');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    expect(button).toBeDisabled();

    userEvent.type(inputEmail, 'zebirita@email.com');
    userEvent.type(inputPassword, '$#zeb');

    expect(button).toBeDisabled();

    userEvent.type(inputEmail, 'zebirita@email.com');
    userEvent.type(inputPassword, '$#zebirita#$');

    expect(button).not.toBeDisabled();

    axios.get.mockImplementation(async () => Promise.resolve(
      { data: mockedProducts },
    ));

    userEvent.click(button);

    await waitFor(() => expect(history.location.pathname).toBe('/customer/products'));
  });

  it('Testa se mensagem de erro aparece', () => {
    axios.post.mockImplementation(async () => new Error('Incorrect email or password'));
    localStorage.clear();

    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('common_login__input-email');
    const inputPassword = screen.getByTestId('common_login__input-password');
    const button = screen.queryByTestId('common_login__button-login');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    expect(button).toBeDisabled();

    userEvent.type(inputEmail, 'zebirita3@email.com');
    userEvent.type(inputPassword, '$#zebirita#$');

    expect(button).not.toBeDisabled();

    userEvent.click(button);
    const errorMessage = screen.queryByTestId('common_login__element-invalid-email');

    waitFor(() => expect(errorMessage).toBeInTheDocument());
  });

  it('Vai para página de criar nova', () => {
    localStorage.clear();
    const { history } = renderWithRouter(<App />);
    history.push('/');
    console.log(history.location.pathname);

    const createAccountButton = screen.getByTestId('common_login__button-register');
    expect(createAccountButton).toBeInTheDocument();

    expect(createAccountButton).not.toBeDisabled();
    userEvent.click(createAccountButton);

    expect(history.location.pathname).toBe('/register');
  });
});
