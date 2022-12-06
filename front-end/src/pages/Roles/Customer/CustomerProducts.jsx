import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import CustomerButton from './CustomerUtils/CustomerButton';
import { SContainer, SText, SWrapper } from './style';

function CustomerProducts() {
  const [products, setProducts] = useState();

  const token = localStorage.getItem('token');

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
    <div>
      <Header title="Produtos" url="/customer/products" />
      <SWrapper>
        {products?.map(({ id, name, price, urlImage }) => (
          <SContainer key={ id }>
            <img
              src={ urlImage }
              alt={ name }
              data-testid={ `customer_products__img-card-bg-image-${id}` }
            />
            <SText>
              <p data-testid={ `customer_products__element-card-title-${id}` }>{name}</p>
              <p
                data-testid={ `customer_products__element-card-price-${id}` }
              >
                {`R$ ${price}`}
              </p>
            </SText>
            <CustomerButton
              id={ id }
              name={ name }
              price={ price }
              urlImage={ urlImage }
            />
          </SContainer>
        ))}

      </SWrapper>
    </div>
  );
}

export default CustomerProducts;
