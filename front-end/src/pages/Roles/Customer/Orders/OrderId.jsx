import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutProducts from '../../../../components/Customer/CheckoutProducts';
import Header from '../../../../components/Header';
import useAppData from '../../../../context/hooks/useAppData';
import { readCart } from '../../../../localstorage';

function OrderId() {
  const { totalPrice, totalValue } = useAppData();
  const { id } = useParams();
  const [infos, setInfos] = useState(null);
  const [getStatus, setGetStatus] = useState('Pendente');
  const [disable, setDisable] = useState(false);

  const { token } = JSON.parse(localStorage.getItem('user'));

  const TEST_ID = 'customer_order_details__element-order-details-label-delivery-status';

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
        if (data?.status === 'Entregue') {
          setDisable(true);
          setGetStatus('Entregue');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id, token, totalValue]);

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
        setDisable(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <Header title="Produtos" url="/customer/products" />
      <h1>Detalhe do Pedido</h1>
      {infos && (
        <div>
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
              disabled={ disable }
              data-testid="customer_order_details__button-delivery-check"
            >
              Marcar Como Entregue
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
          {
            infos?.products.map(({
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
            ))
          }
        </tbody>
      </table>
      <div>
        <p>Valor Total:</p>
        <p>
          {totalPrice?.toLocaleString(
            'pt-BR',
            { style: 'currency', currency: 'BRL' },
          ) ?? '0,00'}
        </p>
      </div>
    </div>
  );
}

export default OrderId;
