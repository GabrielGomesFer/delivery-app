import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Products from './components/Products';
import Register from './components/Register';

function App() {
  return (
    <div className="main">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/customer/products" component={ Products } />
      </Switch>
    </div>
  );
}

export default App;
