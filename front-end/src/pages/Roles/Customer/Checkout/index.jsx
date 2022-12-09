import { useEffect, useState } from 'react';
import Address from '../../../../components/Customer/Address';
import CheckoutProducts from '../../../../components/Customer/CheckoutProducts';
import Header from '../../../../components/Header';
import useAppData from '../../../../context/hooks/useAppData';
import { deleteProducts, readCart } from '../../../../localstorage';
import { SContainerCustomer, STotalValue } from './styles';

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
      <table>
        <tbody>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
          {
            getCartProducts?.map(({ urlImage, id, name, price, newPrice, qtd }, i) => (
              <tr key={ i }>
                <CheckoutProducts
                  urlImage={ urlImage }
                  name={ name }
                  price={ price }
                  newPrice={ newPrice }
                  qtd={ qtd }
                  i={ i }
                  removeProduct={ () => removeProduct(id) }
                  dataTestIndex={
                    `customer_checkout__element-order-table-item-number-${i}`
                  }
                  dataTestDesc={
                    `customer_checkout__element-order-table-name-${i}`
                  }
                  dataTestQtd={
                    `customer_checkout__element-order-table-quantity-${i}`
                  }
                  dataTestVU={
                    `customer_checkout__element-order-table-unit-price-${i}`
                  }
                  dataTestSub={
                    `customer_checkout__element-order-table-sub-total-${i}`
                  }
                />
              </tr>
            ))
          }
        </tbody>
      </table>
      <STotalValue>
        <p>Valor Total:</p>
        <p
          data-testid="customer_checkout__element-order-total-price"
        >
          { totalPrice?.toLocaleString(
            'pt-BR',
            { style: 'currency', currency: 'BRL' },
          ) ?? '0,00'}
        </p>
      </STotalValue>
      <Address />
    </SContainerCustomer>
  );
}

export default CustomerCheckout;
