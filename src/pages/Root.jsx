import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';
import PrivateRoute from 'auth';
import Logout from 'components/Logout/logout';
import UserLogin from '../components/User/Login/Login'
const PagesRoot = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={UserLogin} />
      <PrivateRoute exact path="/home" component={Home} />
      <Route  exact path="/logout" component={Logout} />
    </Switch>
  </Router>
)


export default PagesRoot;
