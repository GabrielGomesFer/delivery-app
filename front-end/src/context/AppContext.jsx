import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import { readCart } from '../localstorage';

const AppContext = createContext({});

export function AppProvider({ children }) {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getLocal = readCart();
    setProduct(getLocal);
  }, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const data = { product };

  return (
    <AppContext.Provider value={ data }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContext;
