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
            <img src="https://user-images.githubusercontent.com/99758843/206025746-bba71fe8-5f10-4192-afc6-f130fb2e619c.jpeg" alt={ name } />
            <SText>
              <p>{name}</p>
              <p>{`R$ ${price}`}</p>
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
