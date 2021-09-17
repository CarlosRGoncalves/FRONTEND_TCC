import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from '../Home/Home';
import Usuarios from '../Usuarios/Usuario';
import Usuarios_Cadastro from '../Usuarios/Usuario cadastro';
import Usuarios_Alterar from '../Usuarios/Usuario alterar';
import Menu_Inicial from '../Menu_Inicial/menu_inicial';
import Pagina_Inicial from '../Pagina_Inicial/pagina_inicial';

import PrivateRoute from 'private/auth';
import Logout from 'components/Logout/logout';
import UserLogin from '../Login/Login'
const PagesRoot = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={UserLogin} />
      <PrivateRoute exact path="/home" component={Home} />
      <PrivateRoute exact path="/usuario" component={Usuarios} />
      <PrivateRoute exact path="/usuario/cadastro" component={Usuarios_Cadastro} />
      <PrivateRoute exact path="/usuario/alterar/:id_usuario" component={Usuarios_Alterar} />
      <Route  exact path="/logout" component={Logout} />
      <PrivateRoute  exact path="/menu_inicial" component={Menu_Inicial} />
      <PrivateRoute  exact path="/pagina_inicial" component={Pagina_Inicial} />
    </Switch>
  </Router>
)


export default PagesRoot;
