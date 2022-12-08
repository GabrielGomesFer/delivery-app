import { Trash } from 'phosphor-react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { SCartDetails, SCartDetailsTitle, SCheckout } from './styles';

function CheckoutProducts({
  urlImage,
  name,
  price,
  newPrice,
  qtd,
  i,
  removeProduct,
  dataTestIndex,
  dataTestDesc,
  dataTestQtd,
  dataTestVU,
  dataTestSub,
}) {
  const history = useHistory();
  return (
    <SCheckout>
      <img src={ urlImage } alt={ name } height="100px" />
      <SCartDetails>
        <SCartDetailsTitle>
          <p
            data-testid={ dataTestIndex }
          >
            { i + 1 }
          </p>
          <p
            data-testid={ dataTestDesc }
          >
            { name }
          </p>
        </SCartDetailsTitle>
        <section>
          <p
            data-testid={ dataTestQtd }
          >
            { qtd }
          </p>
          <p
            data-testid={ dataTestVU }
          >
            { Number(price).toLocaleString(
              'pt-BR',
              { style: 'currency', currency: 'BRL' },
            ) }
          </p>
          <p
            data-testid={ dataTestSub }
          >
            { newPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
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

CheckoutProducts.propTypes = {
  name: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  newPrice: PropTypes.number.isRequired,
  qtd: PropTypes.number.isRequired,
  i: PropTypes.number.isRequired,
  dataTestIndex: PropTypes.string.isRequired,
  dataTestDesc: PropTypes.string.isRequired,
  dataTestQtd: PropTypes.string.isRequired,
  dataTestVU: PropTypes.string.isRequired,
  dataTestSub: PropTypes.string.isRequired,
  removeProduct: PropTypes.func,
};

CheckoutProducts.defaultProps = {
  removeProduct: () => {},
};

export default CheckoutProducts;
