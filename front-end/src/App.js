import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminManage from './pages/Roles/Admin/AdminManage';
import Checkout from './pages/Roles/Customer/Checkout';
import MyOrders from './pages/Roles/Customer/Orders/MyOrders';
import OrdersId from './pages/Roles/Customer/Orders/OrderId';
import Products from './pages/Roles/Customer/Products';
import SellerOrders from './pages/Roles/Seller/SellerOrders';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/customer/products" component={ Products } />
      <Route path="/customer/checkout" component={ Checkout } />
      <Route exact path="/customer/orders" component={ MyOrders } />
      <Route path="/customer/orders/:id" component={ OrdersId } />
      <Route path="/seller/orders" component={ SellerOrders } />
      <Route path="/admin/manage" component={ AdminManage } />
    </Switch>
  );
}

export default App;
