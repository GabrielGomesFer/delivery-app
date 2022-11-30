import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('Testa a página de Registro', () => {
  it('Verifica funcionalidade do Registro', () => {
    const { history } = renderWithRouter(<App />);

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

    userEvent.type(inputPassword, '123456');

    expect(button).not.toBeDisabled();

    userEvent.click(button);

    expect(history.location.pathname).toBe('/customer/products');
  });

  it('Testa se mensagem de erro aparece', () => {
    const inputName = screen.getByTestId('common_register__input-name');
    const inputEmail = screen.getByTestId('common_register__input-email');
    const inputPassword = screen.getByTestId('common_register__input-password');
    const button = screen.getByTestId('common_register__button-register');
    const errorMessage = screen.getByTestId('common_register__element-invalid_register');

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    expect(button).toBeDisabled();

    userEvent.type(inputName, 'Cliente de teste');

    expect(button).toBeDisabled();

    userEvent.type(inputEmail, 'zebirita@email.com');

    expect(button).toBeDisabled();

    userEvent.type(inputPassword, '123456');

    expect(button).not.toBeDisabled();

    userEvent.click(button);

    expect(errorMessage).toBeInTheDocument();
  });
});
