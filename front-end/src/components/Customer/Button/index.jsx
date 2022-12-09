import { MinusCircle, PlusCircle } from 'phosphor-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import useAppData from '../../../context/hooks/useAppData';
import { createCart, deleteProducts, readCart, updateCart } from '../../../localstorage';
import SInfos from './styles';

function Button({ id, name, price, urlImage }) {
  const { totalValue } = useAppData();
  const [count, setCount] = useState(0);

  const decreaseCount = () => {
    setCount(count - 1);

    if ((count - 1) === 0) {
      deleteProducts(id);
      const productsCart = readCart();

      return totalValue(productsCart);
    }

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

  const typeCount = ({ target: { value } }) => {
    const productsCart = readCart();
    const newValue = Number(value);

    if (!productsCart.some(({ id: productId }) => productId === id)) {
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

    if (newValue === 0) {
      return deleteProducts(id);
    }

    const cartUpdated = updateCart(
      {
        id,
        name,
        price,
        urlImage,
        qtd: newValue,
        newPrice: price * newValue,
      },
    );
    totalValue(cartUpdated);
    setCount(newValue);
  };

  return (
    <SInfos>
      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        onClick={ () => count > 0 && decreaseCount() }
      >
        <MinusCircle
          size={ 25 }
          style={ { cursor: 'pointer' } }
        />
      </button>
      <input
        type="text"
        value={ count }
        onChange={ typeCount }
        data-testid={ `customer_products__input-card-quantity-${id}` }
      />
      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${id}` }
        onClick={ () => incrementCount() }
      >
        <PlusCircle
          size={ 25 }
          style={ { cursor: 'pointer' } }
        />
      </button>

    </SInfos>
  );
}

export default Button;

Button.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
};
