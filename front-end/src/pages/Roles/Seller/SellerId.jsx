import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutProducts from '../../../components/Customer/CheckoutProducts';
import Header from '../../../components/Header';
import { SH1, STable, STotalValue } from '../Customer/Checkout/styles';
import { SRequestInfos } from '../Customer/Orders/idStyles';

function SellerId() {
  const { id } = useParams();
  const [infos, setInfos] = useState(null);
  const [getStatus, setGetStatus] = useState('');
  const [newTotalValue, setNewTotalValue] = useState(0);

  const TEST_ID = 'seller_order_details__element-order-details-label-delivery-status';

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
        setGetStatus(data.status);
        setInfos(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id, token]);

  const updateOrder = (statusUpdated) => {
    axios
      .put(
        `http://localhost:3001/sales/${id}`,
        {
          status: statusUpdated,
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
        console.log(status);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <Header title="Pedidos" url="/seller/orders" />
      <SH1>Detalhes do Pedido</SH1>
      {infos && (
        <SRequestInfos>
          <p
            data-testid="seller_order_details__element-order-details-label-order-id"
          >
            {`Pedido ${id}`}
          </p>
          <p
            data-testid="seller_order_details__element-order-details-label-order-date"
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
              onClick={ () => updateOrder('Preparando') }
              data-testid="seller_order_details__button-preparing-check"
              disabled={ getStatus !== 'Pendente' }
            >
              Preparar o Pedido
            </button>
            <button
              type="button"
              onClick={ () => updateOrder('Em Trânsito') }
              data-testid="seller_order_details__button-dispatch-check"
              disabled={ getStatus !== 'Preparando' }
            >
              Saiu para a Entrega
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
          {infos?.products.map(({ name, price, SaleProduct: { quantity } }, i) => (
            <CheckoutProducts
              key={ i }
              name={ name }
              price={ price }
              newPrice={ Number(price) * (quantity) }
              qtd={ quantity }
              i={ i }
              dataTestIndex={
                `seller_order_details__element-order-table-item-number-${i}`
              }
              dataTestDesc={
                `seller_order_details__element-order-table-name-${i}`
              }
              dataTestQtd={
                `seller_order_details__element-order-table-quantity-${i}`
              }
              dataTestVU={
                `seller_order_details__element-order-table-unit-price-${i}`
              }
              dataTestSub={
                `seller_order_details__element-order-table-sub-total-${i}`
              }
            />
          ))}
        </tbody>
      </STable>
      <STotalValue>
        <p>Valor Total:</p>
        <p data-testid="seller_order_details__element-order-total-price">
          {newTotalValue?.toLocaleString(
            'pt-BR',
            { style: 'currency', currency: 'BRL' },
          ) ?? '0,00'}
        </p>
      </STotalValue>
    </div>
  );
}

export default SellerId;
