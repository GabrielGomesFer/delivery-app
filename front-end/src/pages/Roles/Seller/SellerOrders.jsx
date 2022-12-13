import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  SOrdersSeller,
  SOrdersWrapperSeller,
  SRequestIdSeller,
  SRequestStatusSeller,
  SRequestDetailsSeller,
} from './styles';
import Header from '../../../components/Header';

function SellerOrders() {
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
      <Header title="Pedidos" url="/seller/orders" />
      <SOrdersSeller>
        {!orders ? (
          <p>Nenhum pedido aqui</p>
        ) : (
          orders.map(({ id, saleDate, status, address, totalPrice }) => (
            <Link to={ `/seller/orders/${id}` } key={ id }>
              <SOrdersWrapperSeller>
                <SRequestIdSeller>
                  <p>Pedido:</p>
                  <p data-testid={ `seller_orders__element-order-id-${id}` }>{ id }</p>
                </SRequestIdSeller>
                <SRequestStatusSeller>
                  <p
                    data-testid={ `seller_orders__element-delivery-status-${id}` }
                  >
                    { status }
                  </p>
                  <p
                    data-testid={ `seller_orders__element-card-address-${id}` }
                  >
                    { address }
                  </p>
                </SRequestStatusSeller>
                <SRequestDetailsSeller>
                  <p
                    data-testid={ `seller_orders__element-order-date-${id}` }
                  >
                    { moment(saleDate).format('DD/MM/YYYY') }
                  </p>
                  <p data-testid={ `seller_orders__element-card-price-${id}` }>
                    { Number(totalPrice).toLocaleString(
                      'pt-BR',
                      { style: 'currency', currency: 'BRL' },
                    ) }
                  </p>
                </SRequestDetailsSeller>
              </SOrdersWrapperSeller>
            </Link>
          ))
        )}
      </SOrdersSeller>
    </>
  );
}

export default SellerOrders;
