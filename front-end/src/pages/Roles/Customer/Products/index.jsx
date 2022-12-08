import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../../components/Customer/Button';
import Header from '../../../../components/Header';
import useAppData from '../../../../context/hooks/useAppData';
import { SCart, SContainer, SContainerCustomer, SText, SWrapper } from './styles';

function CustomerProducts() {
  const { totalPrice } = useAppData();
  const [products, setProducts] = useState();

  const { token } = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    axios
      .get('http://localhost:3001/product', {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        const { data } = response;
        setProducts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SContainerCustomer>
      <Header title="Produtos" url="/customer/products" />
      <SWrapper>
        {products?.map(({ id, name, price, urlImage }) => (
          <SContainer key={ id }>
            <img
              src={ urlImage }
              height="100px"
              alt={ name }
              data-testid={ `customer_products__img-card-bg-image-${id}` }
            />
            <SText>
              <p data-testid={ `customer_products__element-card-title-${id}` }>{name}</p>
              <p
                data-testid={ `customer_products__element-card-price-${id}` }
              >
                {Number(price)?.toLocaleString(
                  'pt-BR',
                  { style: 'currency', currency: 'BRL' },
                ) ?? '0,00'}
              </p>
            </SText>
            <Button
              id={ id }
              name={ name }
              price={ price }
              urlImage={ urlImage }
            />
          </SContainer>
        ))}
      </SWrapper>
      <Link to="/customer/checkout">
        <SCart data-testid="customer_products__button-cart">
          <p>Ver Carrinho</p>
          <p
            data-testid="customer_products__checkout-bottom-value"
          >
            {totalPrice?.toLocaleString(
              'pt-BR',
              { style: 'currency', currency: 'BRL' },
            ) ?? '0,00'}
          </p>
        </SCart>
      </Link>
    </SContainerCustomer>
  );
}

export default CustomerProducts;
