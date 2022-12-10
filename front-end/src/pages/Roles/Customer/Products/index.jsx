import axios from 'axios';
import { ShoppingCartSimple } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../../../components/Customer/Button';
import Header from '../../../../components/Header';
import useAppData from '../../../../context/hooks/useAppData';
import { readCart } from '../../../../localstorage';
import { SCard, SProducts, SProductsWrapper, STotalCart } from './styles';

function CustomerProducts() {
  const history = useHistory();
  const { totalPrice, totalValue } = useAppData();
  const [products, setProducts] = useState();

  const { token } = JSON.parse(localStorage.getItem('user'));

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
        const getCart = readCart();
        totalValue(getCart);
      })
      .catch((err) => {
        console.log(err.message);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <SProductsWrapper>
      <Header title="Produtos" url="/customer/products" />
      <STotalCart
        disabled={ totalPrice === 0 }
        data-testid="customer_products__button-cart"
        onClick={ () => history.push('/customer/checkout') }
      >
        <ShoppingCartSimple size={ 30 } color="#000000" />
        <p
          data-testid="customer_products__checkout-bottom-value"
        >
          {totalPrice?.toLocaleString(
            'pt-BR',
            { style: 'currency', currency: 'BRL' },
          ) ?? '0,00'}
        </p>
      </STotalCart>
      <SProducts>
        {products?.map(({ id, name, price, urlImage }) => (
          <SCard key={ id }>
            <img
              src={ urlImage }
              alt={ name }
              data-testid={ `customer_products__img-card-bg-image-${id}` }
            />
            <p data-testid={ `customer_products__element-card-title-${id}` }>{name}</p>
            <span
              data-testid={ `customer_products__element-card-price-${id}` }
            >
              {Number(price)?.toLocaleString(
                'pt-BR',
                { style: 'currency', currency: 'BRL' },
              ) ?? '0,00'}
            </span>
            <Button
              id={ id }
              name={ name }
              price={ price }
              urlImage={ urlImage }
            />
          </SCard>
        ))}
      </SProducts>
    </SProductsWrapper>
  );
}

export default CustomerProducts;
