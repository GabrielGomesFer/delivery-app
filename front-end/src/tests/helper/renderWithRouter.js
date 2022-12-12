import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { AppProvider } from '../../context/AppContext';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <AppProvider>
        <Router history={ history }>{component}</Router>
      </AppProvider>,
    ),
    history,
  });
};
export default renderWithRouter;
