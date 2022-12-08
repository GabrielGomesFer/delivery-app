import { Trash } from 'phosphor-react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { SCartDetails, SCartDetailsTitle, SCheckout } from './styles';

function CustomerCheckoutProducts({
  urlImage,
  name,
  price,
  newPrice,
  qtd,
  i,
  removeProduct,
}) {
  const history = useHistory();
  return (
    <SCheckout>
      <img src={ urlImage } alt={ name } height="100px" />
      <SCartDetails>
        <SCartDetailsTitle>
          <p
            data-testid={ `
                    customer_checkout__element-order-table-item-number-${i}
                    ` }
          >
            { i + 1 }
          </p>
          <p
            data-testid={ `customer_checkout__element-order-table-name-${i}` }
          >
            { name }
          </p>
        </SCartDetailsTitle>
        <section>
          <p
            data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
          >
            { qtd }
          </p>
          <p
            data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
          >
            { price }
          </p>
          <p
            data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
          >
            { newPrice.toFixed(2) }
          </p>
          {history.location.pathname === '/customer/checkout' && (
            <button
              data-testid={ `customer_checkout__element-order-table-remove-${i}` }
              type="button"
              onClick={ removeProduct }
            >
              <Trash size={ 20 } color="#ff0000" style={ { cursor: 'pointer' } } />
            </button>
          )}
        </section>
      </SCartDetails>
    </SCheckout>
  );
}

CustomerCheckoutProducts.propTypes = {
  name: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  newPrice: PropTypes.number.isRequired,
  qtd: PropTypes.number.isRequired,
  i: PropTypes.number.isRequired,
  removeProduct: PropTypes.func.isRequired,
};

export default CustomerCheckoutProducts;
