import axios from 'axios';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

// const axios = require('axios');

jest.mock('axios');

describe('Testa a página de Registro', () => {
  it('Verifica funcionalidade do Registro', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/register');

    axios.post.mockImplementation(() => Promise.resolve(
      { data: { token: 'IsI9.eyJyc2VsbGVyIiwiZW' } },
    ));

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

    jest.clearAllMocks();
  });

  it('Testa se mensagem de erro aparece', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/register');

    axios.post.mockImplementation(() => Promise.resolve(
      { data: { message: 'User alredy registered' } },
    ));

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
