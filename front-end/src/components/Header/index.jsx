import { SignOut } from 'phosphor-react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SHeader, SNavProducts, SUser } from './style';

function Header({ title, url }) {
  const history = useHistory();
  const [user, setUser] = useState({
    role: '',
    name: '',
  });

  useEffect(() => {
    const { role, name } = JSON.parse(localStorage.getItem('user'));
    setUser({ role, name });
  }, []);

  const logOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('products');
    history.push('/login');
  };

  return (
    <SHeader>
      <SNavProducts>
        <img
          src="https://user-images.githubusercontent.com/99758843/204924163-ebb5518e-e604-4f3f-9428-ddd185235a8a.png"
          alt=""
        />
        {user.role === 'seller' && (
          <a
            data-testid="customer_products__element-navbar-link-orders"
            href={ url }
          >
            { title }
          </a>
        )}
        {user.role === 'customer' && (
          <>
            <a
              data-testid="customer_products__element-navbar-link-products"
              href={ url }
            >
              { title }
            </a>
            <a
              data-testid="customer_products__element-navbar-link-orders"
              href="/customer/orders"
            >
              Meus Pedidos
            </a>
          </>
        )}
      </SNavProducts>
      <SUser>
        <div>
          <p>Olá! </p>
          <p
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { user.name }
          </p>
        </div>
        <button
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ () => logOut() }
        >
          <SignOut size={ 20 } style={ { cursor: 'pointer' } } />
          <p>Sair</p>
        </button>
      </SUser>
    </SHeader>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Header;
