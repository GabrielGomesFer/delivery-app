import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutProducts from '../../../components/Customer/CheckoutProducts';
import Header from '../../../components/Header';
import useAppData from '../../../context/hooks/useAppData';
import { readCart } from '../../../localstorage';

function SellerId() {
  const { totalPrice, totalValue } = useAppData();
  const { id } = useParams();
  const [infos, setInfos] = useState(null);
  const [getStatus, setGetStatus] = useState('Pendente');

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
        setInfos(data);
        const getCart = readCart();
        totalValue(getCart);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id, token, totalValue]);

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
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <Header title="Pedidos" url="/seller/orders" />
      <h1>Detalhes do Pedido</h1>
      {infos && (
        <div>
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
            >
              Preparar o Pedido
            </button>
            <button
              type="button"
              onClick={ () => updateOrder('Entregue') }
              data-testid="seller_order_details__button-dispatch-check"
            >
              Saiu para a Entrega
            </button>
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
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
      </table>
      <div>
        <p>Valor Total:</p>
        <p data-testid="seller_order_details__element-order-total-price">
          {totalPrice?.toLocaleString(
            'pt-BR',
            { style: 'currency', currency: 'BRL' },
          ) ?? '0,00'}
        </p>
      </div>
    </div>
  );
}

export default SellerId;
