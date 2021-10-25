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

import Plantas from '../Plantas/Planta';
import Plantas_Cadastro from '../Plantas/Planta cadastro';
import Plantas_Alterar from '../Plantas/Planta alterar';

import Tipos_Plantas from '../Tipos_Plantas/Tipo_planta';
import Tipos_Plantas_Cadastro from '../Tipos_Plantas/Tipo_planta cadastro';
import Tipos_Plantas_Alterar from '../Tipos_Plantas/Tipo_planta alterar';

import Pragas_Doencas from '../Pragas_Doencas/Praga_doenca';
import Pragas_Doencas_Cadastro from '../Pragas_Doencas/Praga_doenca cadastro';
import Pragas_Doencas_Alterar from '../Pragas_Doencas/Praga_doenca alterar';

import Fornecedor from '../Fornecedor/Fornecedor';
import Fornecedor_Cadastro from '../Fornecedor/Fornecedor  cadastro';
import Fornecedor_Alterar from '../Fornecedor/Fornecedor alterar';

import Produto_Final from '../Produto_Final/Produto_final';
import Produto_Final_Cadastro from '../Produto_Final/Produto_final_cadastro';
import Produto_Final_Alterar from '../Produto_Final/Produto_final_alterar';

import Clientes from '../Clientes/Cliente';
import Clientes_Cadastro from '../Clientes/Cliente_cadastro';
import Clientes_Alterar from '../Clientes/Cliente_alterar';
import Clientes_Relatorio from '../Clientes/Cliente_relatorio';

import Insumos from '../Insumos/Insumo';
import Insumos_Cadastro from '../Insumos/Insumo_cadastro';
import Insumos_Alterar from '../Insumos/Insumo_alterar';

import Pedidos from '../Pedidos/Pedido';
import Pedidos_Cadastro from '../Pedidos/Pedido_cadastro';
import Pedidos_Alterar from '../Pedidos/Pedido_alterar';
import Pedidos_Relatorio from '../Pedidos/Pedido_relatorio';
import Pedidos_Relatorio2 from '../Pedidos/Pedido_relatorio2';


import Plantios from '../Plantios/Plantio';
import Plantios_Cadastro from '../Plantios/Plantio_cadastro';
import Plantios_Alterar from '../Plantios/Plantio_alterar';

import Producoes from '../Producoes/Producao';
import Producoes_Cadastro from '../Producoes/Producao_cadastro';
import Producoes_Alterar from '../Producoes/Producao_alterar';
import Producoes_Relatorio from '../Producoes/Producao_relatorio';


import Colheitas from '../Colheitas/Colheita';
import Colheitas_Cadastro from '../Colheitas/Colheita_cadastro';
import Colheitas_Alterar from '../Colheitas/Colheita_alterar';

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

      <PrivateRoute exact path="/planta" component={Plantas} />
      <PrivateRoute exact path="/planta/cadastro" component={Plantas_Cadastro} />
      <PrivateRoute exact path="/planta/alterar/:id_planta" component={Plantas_Alterar} />

      <PrivateRoute exact path="/praga_doenca" component={Pragas_Doencas} />
      <PrivateRoute exact path="/praga_doenca/cadastro" component={Pragas_Doencas_Cadastro} />
      <PrivateRoute exact path="/praga_doenca/alterar/:id_p_doenca" component={Pragas_Doencas_Alterar} />

      <PrivateRoute exact path="/fornecedor" component={Fornecedor} />
      <PrivateRoute exact path="/fornecedor/cadastro" component={Fornecedor_Cadastro} />
      <PrivateRoute exact path="/fornecedor/alterar/:id_fornecedor" component={Fornecedor_Alterar} />

      <PrivateRoute exact path="/produto_final" component={Produto_Final} />
      <PrivateRoute exact path="/produto_final/cadastro" component={Produto_Final_Cadastro} />
      <PrivateRoute exact path="/produto_final/alterar/:id_produto_final" component={Produto_Final_Alterar} />

      <PrivateRoute exact path="/cliente" component={Clientes} />
      <PrivateRoute exact path="/cliente/cadastro" component={Clientes_Cadastro} />
      <PrivateRoute exact path="/cliente/alterar/:id_cliente" component={Clientes_Alterar} />
      <PrivateRoute exact path="/cliente/relatorio" component={Clientes_Relatorio} />

      <PrivateRoute exact path="/insumo" component={Insumos} />
      <PrivateRoute exact path="/insumo/cadastro" component={Insumos_Cadastro} />
      <PrivateRoute exact path="/insumo/alterar/:id_insumo" component={Insumos_Alterar} />

      <PrivateRoute exact path="/pedido" component={Pedidos} />
      <PrivateRoute exact path="/pedido/cadastro" component={Pedidos_Cadastro} />
      <PrivateRoute exact path="/pedido/alterar/:id_pedido" component={Pedidos_Alterar} />
      <PrivateRoute exact path="/pedido/relatorio" component={Pedidos_Relatorio} />
      <PrivateRoute exact path="/pedido/relatorio2" component={Pedidos_Relatorio2} />
      
      <PrivateRoute exact path="/plantio" component={Plantios} />
      <PrivateRoute exact path="/plantio/cadastro" component={Plantios_Cadastro} />
      <PrivateRoute exact path="/plantio/alterar/:id_plantio" component={Plantios_Alterar} />

      <PrivateRoute exact path="/producao" component={Producoes} />
      <PrivateRoute exact path="/producao/cadastro" component={Producoes_Cadastro} />
      <PrivateRoute exact path="/producao/alterar/:id_producao" component={Producoes_Alterar} />
      <PrivateRoute exact path="/producao/relatorio" component={Producoes_Relatorio} />

      <PrivateRoute exact path="/colheita" component={Colheitas} />
      <PrivateRoute exact path="/colheita/cadastro" component={Colheitas_Cadastro} />
      <PrivateRoute exact path="/colheita/alterar/:id_colheita" component={Colheitas_Alterar} />

      <Route  exact path="/logout" component={Logout} />
      <PrivateRoute  exact path="/menu_inicial" component={Menu_Inicial} />
      <PrivateRoute  exact path="/pagina_inicial" component={Pagina_Inicial} />
    </Switch>
  </Router>
)


export default PagesRoot;
