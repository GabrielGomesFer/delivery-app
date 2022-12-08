import PropTypes from 'prop-types';
import { createContext, useMemo, useState } from 'react';

const AppContext = createContext({});

export function AppProvider({ children }) {
  const [totalPrice, setTotalPrice] = useState(null);

  const totalValue = (newCart) => {
    const getAllValues = newCart.reduce((acc, { newPrice }) => acc + newPrice, 0);
    setTotalPrice(getAllValues);
  };

  const data = useMemo(() => ({
    totalPrice, totalValue,
  }), [totalPrice]);

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
