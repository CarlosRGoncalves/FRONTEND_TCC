import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';

import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import BlurOnOutlinedIcon from '@material-ui/icons/BlurOnOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ContactsOutlinedIcon from '@material-ui/icons/ContactsOutlined';

import BlurLinearIcon from '@material-ui/icons/BlurLinear';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function ListItems (){
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [openCad, setOpenCad] = React.useState(true);
  const [openCli, setOpenCli] = React.useState(true);
  const [openProd, setOpenProd] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
   
  };
  const handleClickCad = () => {
    
    setOpenCad(!openCad);
  };
  const handleClickCli = () => {
    
    setOpenCli(!openCli);
  };
  const handleClickProd = () => {
    
    setOpenProd(!openProd);
  };
  function listI(text) {
    if(text == 'Página Inicial'){
      window.location.replace(process.env.REACT_APP_FRONT_URL + "pagina_inicial");
    }else if(text == 'Sair'){
      window.location.replace(process.env.REACT_APP_FRONT_URL + "logout");
    }
    else if(text == 'Cadastros'){
      handleClickCad();
      //window.location.replace(process.env.REACT_APP_FRONT_URL + "menu_inicial");
    }
    else if(text == 'Relátorios'){
      handleClick();
     // window.location.replace(process.env.REACT_APP_FRONT_URL + "menu_inicial");
    }
    else if(text == 'Clientes'){
      handleClickCli();
     // window.location.replace(process.env.REACT_APP_FRONT_URL + "menu_inicial");
    }
    else if(text == 'Produções'){
      handleClickProd();
     // window.location.replace(process.env.REACT_APP_FRONT_URL + "menu_inicial");
    }
    
  }
  function RelPedidos() {
    
      window.location.replace(process.env.REACT_APP_FRONT_URL + "pedido/relatorio");
  
    
  }

  function RelPedidos2() {
    
    window.location.replace(process.env.REACT_APP_FRONT_URL + "pedido/relatorio2");

  
}
function RelPedido() {
    
  window.location.replace(process.env.REACT_APP_FRONT_URL + "pedido");


}
function RelProd_final() {
    
  window.location.replace(process.env.REACT_APP_FRONT_URL + "produto_final");


}
  function RelClientes() {
    
    window.location.replace(process.env.REACT_APP_FRONT_URL + "cliente/relatorio");
 }
 function RelCliente() {
    
  window.location.replace(process.env.REACT_APP_FRONT_URL + "cliente");
}
 function RelProducoes() {
    
  window.location.replace(process.env.REACT_APP_FRONT_URL + "producao/relatorio");


}
function RelFornecedores() {
    
  window.location.replace(process.env.REACT_APP_FRONT_URL + "fornecedor");


}
function RelInsumos() {
    
  window.location.replace(process.env.REACT_APP_FRONT_URL + "insumo");


}
function RelPlantas() {
    
  window.location.replace(process.env.REACT_APP_FRONT_URL + "planta");


}
function RelPragas_doencas() {
    
  window.location.replace(process.env.REACT_APP_FRONT_URL + "praga_doenca");


}
function RelSecoes() {
    
  window.location.replace(process.env.REACT_APP_FRONT_URL + "secao");


}
function RelTipo_Planta() {
    
  window.location.replace(process.env.REACT_APP_FRONT_URL + "tipo_planta");


}
function RelUn_Medidas() {
    
  window.location.replace(process.env.REACT_APP_FRONT_URL + "unidade_medida");


}
function RelUsuarios() {
    
  window.location.replace(process.env.REACT_APP_FRONT_URL + "usuario");


}
function RelProd() {
    
  window.location.replace(process.env.REACT_APP_FRONT_URL + "producao");


}
function RelColhe() {
    
  window.location.replace(process.env.REACT_APP_FRONT_URL + "colheita");


}
function RelPlantio() {
    
  window.location.replace(process.env.REACT_APP_FRONT_URL + "plantio");


}

  return(
          <>
            <List
            component="nav"
            aria-labelledby="nested-list-subheader"
           
            className={classes.root}
                  
                    >
                  <ListItem button onClick = {() => listI("Página Inicial")}>
                        <ListItemIcon>
                          <KeyboardArrowRightIcon />
                        </ListItemIcon>
                        <ListItemText primary="Página Inicial" onClick = {() => listI("Página Inicial")}/>
                  </ListItem>
                  <ListItem button onClick={handleClickCad}>
                        <ListItemIcon color="secondary">
                                <AssignmentTurnedInOutlinedIcon />
                        </ListItemIcon>
                                <ListItemText primary="Cadastros"  />
                                {openCad ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={!openCad} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <BlurOnOutlinedIcon />
                          </ListItemIcon>
                          
                          <ListItemText primary="Fornecedores" onClick = {() => RelFornecedores()} />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <BlurOnOutlinedIcon />
                          </ListItemIcon>
                          
                          <ListItemText primary="Insumos" onClick = {() => RelInsumos()} />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <BlurOnOutlinedIcon />
                          </ListItemIcon>
                          <ListItemText primary="Plantas" onClick = {() => RelPlantas()} />
                          
                        </ListItem>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <BlurOnOutlinedIcon />
                          </ListItemIcon>
                          
                          <ListItemText primary="Pragas/Doenças" onClick = {() => RelPragas_doencas()} />
                        </ListItem>

                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <BlurOnOutlinedIcon />
                          </ListItemIcon>
                          
                          <ListItemText primary="Seções" onClick = {() => RelSecoes()} />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <BlurOnOutlinedIcon />
                          </ListItemIcon>
                          
                          <ListItemText primary="Tipo de Plantas" onClick = {() => RelTipo_Planta()} />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <BlurOnOutlinedIcon />
                          </ListItemIcon>
                          
                          <ListItemText primary="Unidades Medidas" onClick = {() => RelUn_Medidas()} />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <BlurOnOutlinedIcon />
                          </ListItemIcon>
                          
                          <ListItemText primary="Usuários" onClick = {() => RelUsuarios()} />
                        </ListItem>
                      </List>
                    </Collapse>

                    <ListItem button onClick={handleClickCli}>
                        <ListItemIcon>
                                <ContactsOutlinedIcon />
                        </ListItemIcon>
                                <ListItemText primary="Clientes" />
                                {openCli ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={!openCli} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <BlurOnOutlinedIcon />
                          </ListItemIcon>
                          
                          <ListItemText primary="Clientes" onClick = {() => RelCliente()} />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <BlurOnOutlinedIcon />
                          </ListItemIcon>
                          
                          <ListItemText primary="Pedidos" onClick = {() => RelPedido()} />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <BlurOnOutlinedIcon />
                          </ListItemIcon>
                          <ListItemText primary="Produtos Finais" onClick = {() => RelProd_final()} />
                          
                        </ListItem>

                      </List>
                    </Collapse>
                    
                    <ListItem button onClick={handleClickProd}>
                        <ListItemIcon>
                                <BuildOutlinedIcon />
                        </ListItemIcon>
                                <ListItemText primary="Produções" />
                                {openProd ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={!openProd} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <BlurOnOutlinedIcon />
                          </ListItemIcon>
                          
                          <ListItemText primary="Colheita" onClick = {() => RelColhe()} />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <BlurOnOutlinedIcon />
                          </ListItemIcon>
                          
                          <ListItemText primary="Plantio" onClick = {() => RelPlantio()} />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <BlurOnOutlinedIcon />
                          </ListItemIcon>
                          <ListItemText primary="Produção" onClick = {() => RelProd()} />
                          
                        </ListItem>

                      </List>
                    </Collapse>
                  <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                                <BlurLinearIcon />
                        </ListItemIcon>
                                <ListItemText primary="Relatórios" />
                                {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  


                    <Collapse in={!open} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <BlurOnOutlinedIcon />
                          </ListItemIcon>
                          
                          <ListItemText primary="Clientes" onClick = {() => RelClientes()} />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <BlurOnOutlinedIcon />
                          </ListItemIcon>
                          
                          <ListItemText primary="Pedidos" onClick = {() => RelPedidos2()} />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <BlurOnOutlinedIcon />
                          </ListItemIcon>
                          <ListItemText primary="Produtos" onClick = {() => RelPedidos()} />
                          
                        </ListItem>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <BlurOnOutlinedIcon />
                          </ListItemIcon>
                          
                          <ListItemText primary="Produções" onClick = {() => RelProducoes()} />
                        </ListItem>

                      </List>
                    </Collapse>
                    <ListItem button onClick = {() => listI("Sair")}>
                          <ListItemIcon>
                            <PowerSettingsNewIcon />
                          </ListItemIcon>
                          <ListItemText primary="Sair" onClick = {() => listI("Sair")} />
                  </ListItem>
            </List>
          </>
  )
}