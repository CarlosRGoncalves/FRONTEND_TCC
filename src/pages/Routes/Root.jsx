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

import Secoes from '../Secoes/Secao';
import Secoes_Cadastro from '../Secoes/Secao cadastro';
import Secoes_Alterar from '../Secoes/Secao alterar';


import Tipos_Plantas from '../Tipos_Plantas/Tipo_planta';
import Tipos_Plantas_Cadastro from '../Tipos_Plantas/Tipo_planta cadastro';
import Tipos_Plantas_Alterar from '../Tipos_Plantas/Tipo_planta alterar';

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

      <PrivateRoute exact path="/secao" component={Secoes} />
      <PrivateRoute exact path="/secao/cadastro" component={Secoes_Cadastro} />
      <PrivateRoute exact path="/secao/alterar/:id_secao" component={Secoes_Alterar} />

      <PrivateRoute exact path="/tipo_planta" component={Tipos_Plantas} />
      <PrivateRoute exact path="/tipo_planta/cadastro" component={Tipos_Plantas_Cadastro} />
      <PrivateRoute exact path="/tipo_planta/alterar/:id_tipo_planta" component={Tipos_Plantas_Alterar} />

      <Route  exact path="/logout" component={Logout} />
      <PrivateRoute  exact path="/menu_inicial" component={Menu_Inicial} />
      <PrivateRoute  exact path="/pagina_inicial" component={Pagina_Inicial} />
    </Switch>
  </Router>
)


export default PagesRoot;
