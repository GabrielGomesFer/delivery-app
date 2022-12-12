import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../../components/Header';
import {
  SOrders,
  SOrdersWrapper, SRequestDetails, SRequestId,
  SRequestStatus,
} from './styles';

function MyOrders() {
  const [orders, setOrders] = useState();

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    axios
      .get('http://localhost:3001/sales', {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        const { data } = response;
        setOrders(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header title="Produtos" url="/customer/products" />
      <SOrders>
        {!orders ? (
          <p>Nenhum pedido aqui</p>
        ) : (
          orders.map(({ id, saleDate, status, totalPrice }) => (
            <Link to={ `/customer/orders/${id}` } key={ id }>
              <SOrdersWrapper>
                <SRequestId>
                  <p>Pedido:</p>
                  <p data-testid={ `customer_orders__element-order-id-${id}` }>{ id }</p>
                </SRequestId>
                <SRequestStatus>
                  <p
                    data-testid={ `customer_orders__element-delivery-status-${id}` }
                  >
                    { status }
                  </p>
                </SRequestStatus>
                <SRequestDetails>
                  <p
                    data-testid={ `customer_orders__element-order-date-${id}` }
                  >
                    { moment(saleDate).format('DD/MM/YYYY') }
                  </p>
                  <p data-testid={ `customer_orders__element-card-price-${id}` }>
                    { Number(totalPrice).toLocaleString(
                      'pt-BR',
                      { style: 'currency', currency: 'BRL' },
                    ) }
                  </p>
                </SRequestDetails>
              </SOrdersWrapper>
            </Link>
          ))
        )}
      </SOrders>
    </>
  );
}

export default MyOrders;
