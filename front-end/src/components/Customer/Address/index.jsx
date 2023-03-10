import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAppData from '../../../context/hooks/useAppData';
import { readCart } from '../../../localstorage';
import { SAddress, SAddressForm } from './styles';

function Address() {
  const history = useHistory();
  const { totalPrice } = useAppData();

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
  }, [token]);

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
        const { saleId } = response.data;
        localStorage.removeItem('products');
        history.push(`/customer/orders/${saleId}`);
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
    <SAddress>
      <h1>Detalhes para Entrega</h1>
      <SAddressForm>
        <label htmlFor="seller">
          <p>P. Vendedora Respons??vel</p>
          <select
            data-testid="customer_checkout__select-seller"
            onClick={ ({ target: { value } }) => setIdSeller(value) }
            name="seller"
          >
            {sellers?.map(({ name, id }) => (
              <option value={ id } key={ id }>{ name }</option>
            ))}
          </select>
        </label>
        <label htmlFor="deliveryAddress">
          <p>Endere??o</p>
          <input
            placeholder="digite o seu endere??o"
            type="text"
            name="deliveryAddress"
            value={ deliveryAddress }
            onChange={ ({ target: { value, name } }) => getInfos(name, value) }
            autoComplete="off"
            data-testid="customer_checkout__input-address"
          />
        </label>
        <label htmlFor="deliveryNumber">
          <p>N??mero</p>
          <input
            placeholder="digite o seu n??mero"
            type="number"
            name="deliveryNumber"
            value={ deliveryNumber }
            onChange={ ({ target: { value, name } }) => getInfos(name, value) }
            data-testid="customer_checkout__input-address-number"
          />
        </label>
      </SAddressForm>
      <button
        onClick={ () => sendOrder() }
        type="button"
        disabled={ !deliveryAddress < '3' && !deliveryNumber }
        data-testid="customer_checkout__button-submit-order"
      >
        Finalizar Pedido
      </button>
    </SAddress>
  );
}

export default Address;
