import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import MailIcon from '@material-ui/icons/Mail';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import BuildIcon from '@material-ui/icons/Build';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import BlurOnOutlinedIcon from '@material-ui/icons/BlurOnOutlined';
import DraftsIcon from '@material-ui/icons/Drafts';
import ListSubheader from '@material-ui/core/ListSubheader';


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

  const handleClick = () => {
    setOpen(!open);
  };
  function listI(text) {
    if(text == 'Página Inicial'){
      window.location.replace(process.env.REACT_APP_FRONT_URL + "pagina_inicial");
    }else if(text == 'Sair'){
      window.location.replace(process.env.REACT_APP_FRONT_URL + "logout");
    }
    else if(text == 'Gerenciar'){
      window.location.replace(process.env.REACT_APP_FRONT_URL + "menu_inicial");
    }
    else if(text == 'Relátorios'){
      handleClick();
     // window.location.replace(process.env.REACT_APP_FRONT_URL + "menu_inicial");
    }
    
  }
  function RelPedidos() {
    
      window.location.replace(process.env.REACT_APP_FRONT_URL + "pedido/relatorio");
  
    
  }
  function RelPedidos2() {
    
    window.location.replace(process.env.REACT_APP_FRONT_URL + "pedido/relatorio2");

  
}
  function RelClientes() {
    
    window.location.replace(process.env.REACT_APP_FRONT_URL + "cliente/relatorio");
 }
 function RelProducoes() {
    
  window.location.replace(process.env.REACT_APP_FRONT_URL + "producao/relatorio");


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
                  <ListItem button onClick = {() => listI("Gerenciar")} >
                        <ListItemIcon>
                          <BuildIcon />
                        </ListItemIcon>
                        <ListItemText primary="Gerenciar" onClick = {() => listI("Gerenciar")} />
                  </ListItem>
                  <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                                <AssignmentIcon />
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