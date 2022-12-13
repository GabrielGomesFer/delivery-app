import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutProducts from '../../../../components/Customer/CheckoutProducts';
import Header from '../../../../components/Header';
import { SH1, STable, STotalValue } from '../Checkout/styles';
import { SRequestInfos } from './idStyles';

function OrderId() {
  const { id } = useParams();
  const [infos, setInfos] = useState(null);
  const [getStatus, setGetStatus] = useState('');
  const [newTotalValue, setNewTotalValue] = useState(0);

  const TEST_ID = 'customer_order_details__element-order-details-label-delivery-status';

  const { token } = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    axios
      .get(`http://localhost:3001/sales/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        const { data } = response;
        setNewTotalValue(Number(data.totalPrice));
        setInfos(data);
        setGetStatus(data.status);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id, token]);

  const updateOrder = () => {
    axios
      .put(
        `http://localhost:3001/sales/${id}`,
        {
          status: 'Entregue',
        },
        {
          headers: {
            authorization: token,
          },
        },
      )
      .then((response) => {
        const { status } = response.data;
        setGetStatus(status);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <Header title="Produtos" url="/customer/products" />
      <SH1>Detalhes do Pedido</SH1>
      {infos && (
        <SRequestInfos>
          <p
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            {`Pedido ${id}`}
          </p>
          <p
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            {`P. Vendedora ${infos.seller.name}`}
          </p>
          <p
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            {moment(infos.saleDate).format('DD/MM/YYYY')}
          </p>
          <div>
            <p
              data-testid={ TEST_ID }
            >
              {getStatus}
            </p>
            <button
              type="button"
              onClick={ () => updateOrder() }
              disabled={ getStatus !== 'Em Trânsito' }
              data-testid="customer_order_details__button-delivery-check"
            >
              Marcar Como Entregue
            </button>
          </div>
        </SRequestInfos>
      )}
      <STable>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {infos?.products.map(({
            urlImage, name, price, SaleProduct: { quantity },
          }, i) => (
            <CheckoutProducts
              key={ i }
              urlImage={ urlImage }
              name={ name }
              price={ price }
              newPrice={ Number(price) * (quantity) }
              qtd={ quantity }
              i={ i }
              dataTestIndex={
                `customer_order_details__element-order-table-item-number-${i}`
              }
              dataTestDesc={
                `customer_order_details__element-order-table-name-${i}`
              }
              dataTestQtd={
                `customer_order_details__element-order-table-quantity-${i}`
              }
              dataTestVU={
                `customer_order_details__element-order-table-unit-price-${i}`
              }
              dataTestSub={
                `customer_order_details__element-order-table-sub-total-${i}`
              }
            />
          ))}
        </tbody>
      </STable>
      <STotalValue>
        <p>Valor Total:</p>
        <p data-testid="customer_order_details__element-order-total-price">
          {newTotalValue?.toLocaleString(
            'pt-BR',
            { style: 'currency', currency: 'BRL' },
          ) ?? '0,00'}
        </p>
      </STotalValue>
    </div>
  );
}

export default OrderId;
