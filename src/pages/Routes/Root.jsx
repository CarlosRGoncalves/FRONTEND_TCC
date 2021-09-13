import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from '../Home/Home';
import Menu_Inicial from '../Menu_Inicial/menu_inicial';
import PrivateRoute from 'private/auth';
import Logout from 'components/Logout/logout';
import UserLogin from '../Login/Login'
const PagesRoot = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={UserLogin} />
      <PrivateRoute exact path="/home" component={Home} />
      <Route  exact path="/logout" component={Logout} />
      <PrivateRoute  exact path="/menu_inicial" component={Menu_Inicial} />
    </Switch>
  </Router>
)


export default PagesRoot;
