import { SignOut } from 'phosphor-react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SContainer, SProducts, SUser } from './style';

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
    history.push('/');
  };

  return (
    <SContainer>
      <SProducts>
        <a
          data-testid="customer_products__element-navbar-link-products"
          href={ url }
        >
          { title }
        </a>
        {user.role === 'customer' && (
          <a
            data-testid="customer_products__element-navbar-link-orders"
            href="/customer/orders"
          >
            Meus Pedidos
          </a>
        )}
      </SProducts>
      <SUser>
        <p
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { user.name }
        </p>
        <button
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ () => logOut() }
        >
          <SignOut size={ 20 } color="#fffafa" />
          <p>Sair</p>
        </button>
      </SUser>
    </SContainer>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Header;
