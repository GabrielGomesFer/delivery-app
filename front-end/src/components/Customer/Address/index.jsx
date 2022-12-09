import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAppData from '../../../context/hooks/useAppData';
import { readCart } from '../../../localstorage';
import { SAddress, SCart } from './styles';

function CustomerAddress() {
  const history = useHistory();
  const { totalPrice, setUserOrderInfos } = useAppData();

  const [sellers, setSellers] = useState([]);
  const [sellerId, setIdSeller] = useState(2);
  const [ids, setIds] = useState([]);
  const [userInfos, setUserInfos] = useState({
    deliveryAddress: '',
    deliveryNumber: '',
  });
  const { deliveryAddress, deliveryNumber } = userInfos;

  const getInfos = (name, value) => setUserInfos((old) => ({ ...old, [name]: value }));

  const { token } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios
      .get('http://localhost:3001/user/search?role=seller', {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        const { data } = response;
        setSellers(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const arr = [];
    const getCart = readCart();
    getCart.forEach(({ id, qtd }) => {
      arr.push({ productId: id, quantity: qtd });
    });
    setIds(arr);
  }, []);

  const sendOrder = () => {
    axios
      .post('http://localhost:3001/sales', {
        totalPrice: Number(totalPrice),
        deliveryAddress: deliveryAddress.toString(),
        deliveryNumber: deliveryNumber.toString(),
        sellerId: Number(sellerId),
        productIds: ids,
      }, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        setUserOrderInfos(response);
        history.push('/customer/orders');
      })
      .catch((err) => {
        console.log(err.message);
        setUserInfos({
          deliveryAddress: '',
          deliveryNumber: '',
        });
      });
  };

  return (
    <div>
      <h1>Detalhes para Entrega</h1>
      <SAddress>
        <label htmlFor="seller">
          P. Vendedora Responsável
          <select onClick={ ({ target: { value } }) => setIdSeller(value) } name="seller">
            {sellers?.map(({ name, id }) => (
              <option value={ id } key={ id }>{ name }</option>
            ))}
          </select>
        </label>
        <label htmlFor="deliveryAddress">
          Endereço
          <input
            placeholder="digite o seu endereço"
            type="text"
            name="deliveryAddress"
            value={ deliveryAddress }
            onChange={ ({ target: { value, name } }) => getInfos(name, value) }
            autoComplete="off"
          />
        </label>
        <label htmlFor="deliveryNumber">
          Número
          <input
            placeholder="digite o seu número"
            type="number"
            name="deliveryNumber"
            value={ deliveryNumber }
            onChange={ ({ target: { value, name } }) => getInfos(name, value) }
          />
        </label>
      </SAddress>
      <SCart>
        <button
          onClick={ () => sendOrder() }
          type="button"
          disabled={ !deliveryAddress < '3' && !deliveryNumber }
        >
          Finalizar Pedido
        </button>
      </SCart>
    </div>
  );
}

export default CustomerAddress;
