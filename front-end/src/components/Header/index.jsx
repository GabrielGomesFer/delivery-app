import jwt from 'jwt-decode';
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
    const response = localStorage.getItem('token');
    const { role, name } = jwt(response);
    setUser({ role, name });
  }, []);

  const logOut = () => {
    localStorage.removeItem('token');
    history.push('/');
  };

  return (
    <SContainer>
      <SProducts>
        <a href={ url }>{ title }</a>
        {user.role === 'customer' && <a href="/customer/orders">Meus Pedidos</a>}
      </SProducts>
      <SUser>
        <p>{ user.name }</p>
        <button type="button" onClick={ () => logOut() }>
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
