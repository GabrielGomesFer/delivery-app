import { Trash } from 'phosphor-react';
import { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import useAppData from '../../../context/hooks/useAppData';
import { deleteProducts, readCart } from '../../../localstorage';
import CustomerAddress from './CustomerUtils/CustomerAddress';
import {
  SCartDetails, SCartDetailsTitle, SCheckout, SContainerCustomer,
  STotalValue, SWrapperCheckout,
} from './style';

function CustomerCheckout() {
  const { totalPrice } = useAppData();
  const [getCartProducts, setGetCartProducts] = useState([]);

  useEffect(() => {
    const cart = readCart();
    setGetCartProducts(cart);
  }, []);

  const removeProduct = (id) => {
    const updatedProducts = deleteProducts(id);
    setGetCartProducts(updatedProducts);
  };

  return (
    <SContainerCustomer>
      <Header title="Produtos" url="/customer/products" />
      <h1>Finalizar Pedido</h1>
      <SWrapperCheckout>
        {getCartProducts?.map(({ urlImage, id, name, price, newPrice, qtd }, i) => (
          <SCheckout key={ id }>
            <img src={ urlImage } alt={ name } />
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
                <button
                  data-testid={ `customer_checkout__element-order-table-remove-${i}` }
                  type="button"
                  onClick={ () => removeProduct(id) }
                >
                  <Trash size={ 20 } color="#ff0000" />
                </button>
              </section>
            </SCartDetails>
          </SCheckout>
        ))}
        <STotalValue>
          <p>Valor Total:</p>
          <p
            data-testid="customer_checkout__element-order-total-price "
          >
            { totalPrice?.toLocaleString(
              'pt-BR',
              { style: 'currency', currency: 'BRL' },
            ) ?? '0,00'}
          </p>
        </STotalValue>
      </SWrapperCheckout>
      <CustomerAddress />
    </SContainerCustomer>
  );
}

export default CustomerCheckout;
