import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminManage from './pages/Roles/Admin/AdminManage';
import CustomerOrders from './pages/Roles/Customer/CustomerOrders';
import CustomerProducts from './pages/Roles/Customer/CustomerProducts';
import SellerOrders from './pages/Roles/Seller/SellerOrders';

function App() {
  return (
    <div className="main">
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/customer/products" component={ CustomerProducts } />
        <Route path="/customer/orders" component={ CustomerOrders } />
        <Route path="/seller/orders" component={ SellerOrders } />
        <Route path="/admin/manage" component={ AdminManage } />
      </Switch>
    </div>
  );
}

export default App;
