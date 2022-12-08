import { MinusCircle, PlusCircle } from 'phosphor-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import useAppData from '../../../context/hooks/useAppData';
import { createCart, updateCart } from '../../../localstorage';
import SInfos from './style';

function CustomerButton({ id, name, price, urlImage }) {
  const { totalValue } = useAppData();
  const [count, setCount] = useState(0);

  const decreaseCount = () => {
    setCount(count - 1);
    const cartUpdated = updateCart(
      {
        id,
        name,
        price,
        urlImage,
        qtd: count - 1,
        newPrice: price * (count - 1),
      },
    );
    totalValue(cartUpdated);
  };

  const incrementCount = () => {
    if (count === 0) {
      const cartCreated = createCart(
        {
          id,
          name,
          price,
          urlImage,
          qtd: 1,
          newPrice: price,
        },
      );
      totalValue(cartCreated);
    }
    setCount(count + 1);
    const cartUpdated = updateCart(
      {
        id,
        name,
        price,
        urlImage,
        qtd: count + 1,
        newPrice: price * (count + 1),
      },
    );
    totalValue(cartUpdated);
  };

  return (
    <SInfos>
      <MinusCircle
        size={ 25 }
        onClick={ () => count > 0 && decreaseCount() }
        style={ { cursor: 'pointer' } }
        data-testid={ `customer_products__button-card-rm-item-${id}` }
      />
      <span
        data-testid={ `customer_products__input-card-quantity-${id}` }
      >
        { count ?? '0' }
      </span>
      <PlusCircle
        size={ 25 }
        onClick={ () => incrementCount() }
        style={ { cursor: 'pointer' } }
        data-testid={ `customer_products__button-card-add-item-${id}` }
      />
    </SInfos>
  );
}

export default CustomerButton;

CustomerButton.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
};
