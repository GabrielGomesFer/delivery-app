import { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();
  const [getRole, setGetRole] = useState('');

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const { role } = JSON.parse(localStorage.getItem('user'));
      setGetRole(role);
    } else {
      history.push('/login');
    }
  }, [history]);

  return (
    <>
      {getRole === 'customer' && <Redirect to="/customer/products" />}
      {getRole === 'seller' && <Redirect to="/seller/orders" />}
      {getRole === 'administrator' && <Redirect to="/admin/manage" />}
    </>
  );
}

export default Home;
