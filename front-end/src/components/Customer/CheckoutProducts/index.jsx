import { Trash } from 'phosphor-react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { SCheckout } from './styles';

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
      <td>
        <img src={ urlImage } alt={ name } height="100px" />
      </td>
      <td data-testid={ dataTestIndex }>
        { i + 1 }
      </td>
      <td data-testid={ dataTestDesc }>
        { name }
      </td>
      <td data-testid={ dataTestQtd }>
        { qtd }
      </td>
      <td data-testid={ dataTestVU }>
        { Number(price).toLocaleString(
          'pt-BR',
          { style: 'currency', currency: 'BRL' },
        ) }
      </td>
      <td data-testid={ dataTestSub }>
        { newPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
      </td>
      {history.location.pathname === '/customer/checkout' && (
        <td>
          <button
            data-testid={ `customer_checkout__element-order-table-remove-${i}` }
            type="button"
            onClick={ removeProduct }
          >
            <Trash size={ 20 } color="#ff0000" style={ { cursor: 'pointer' } } />
          </button>
        </td>
      )}
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
