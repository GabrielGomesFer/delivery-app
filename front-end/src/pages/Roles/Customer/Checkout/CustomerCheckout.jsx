import { useEffect, useState } from 'react';
import CustomerAddress from '../../../../components/Customer/Address';
import CustomerCheckoutProducts from '../../../../components/Customer/CheckoutProducts';
import Header from '../../../../components/Header';
import useAppData from '../../../../context/hooks/useAppData';
import { deleteProducts, readCart } from '../../../../localstorage';
import { SContainerCustomer, STotalValue, SWrapperCheckout } from './styles';

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
          <div key={ id }>
            <CustomerCheckoutProducts
              urlImage={ urlImage }
              name={ name }
              price={ price }
              newPrice={ newPrice }
              qtd={ qtd }
              i={ i }
              removeProduct={ () => removeProduct(id) }
            />
          </div>
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
