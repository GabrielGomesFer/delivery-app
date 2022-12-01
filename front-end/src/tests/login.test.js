import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('Testa a página de login', () => {
  it('Verifica funcionalidade do login', () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('common_login__input-email');
    const inputPassword = screen.getByTestId('common_login__input-password');
    const button = screen.getByTestId('common_login__button-login');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    expect(button).toBeDisabled();

    userEvent.type(inputEmail, 'zebirita.com');
    userEvent.type(inputPassword, '$#zeb');

    expect(button).toBeDisabled();

    userEvent.type(inputEmail, 'zebirita@email.com');
    userEvent.type(inputPassword, '$#zebirita#$');

    expect(button).not.toBeDisabled();

    userEvent.click(button);

    expect(history.location.pathname).toBe('/customer/products');
  });

  it('Testa se mensagem de erro aparece', () => {
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
    const { history } = renderWithRouter(<App />);

    const createAccountButton = screen.getByTestId('common_login__button-register');

    expect(createAccountButton).toBeInTheDocument();

    expect(createAccountButton).not.toBeDisabled();

    userEvent.click(createAccountButton);

    expect(history.location.pathname).toBe('/register');
  });
});
