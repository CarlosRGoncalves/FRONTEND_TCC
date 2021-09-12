import { Container } from '@material-ui/core';
import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import './menu_inicial.css';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { createTheme } from '@material-ui/core/styles';
import { useState,useEffect } from 'react';
import { InputLabel } from '@material-ui/core';
import jwt_decode from "jwt-decode";
import green from '@material-ui/core/colors/green';

const drawerWidth = 240;
const theme = createTheme({
  palette: {
    primary: green,
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    color:green,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

{
  //const token = localStorage.getItem('token');
 // const nome =  useState()

  /* axios.get('http://localhost:3006/cliente/')
  .then(response => {
      if(response.status == 200) {
  
        //console.log(response.data.response.cliente.nome)
        var decoded = jwt_decode(localStorage.getItem("token"));
        //console.log(decoded)
        const t = JSON.stringify(response.data)
        console.log(t)
       localStorage.setItem("teste",t);
      }else{
      throw new Error("Oops! Ocorreu um erro. :(");}
  })
  .catch(e => console.log(e));
  */
 const token = localStorage.getItem("token")
 if(token){
  const decoded = jwt_decode(token);
  localStorage.setItem("nome",decoded.nome);
 }
  //console.log(decoded)
  //localStorage.setItem("nome",decoded.nome);
}
export default function MiniDrawer (){
  
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  function listI(text) {
    if(text == 'Página Inicial'){
      //window.location.replace("http://localhost:3000/teste");

    }else if(text == 'Sair'){
      window.location.replace("http://localhost:3000/logout");
    }
  }
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
      const response = axios.get('http://localhost:3006/cliente/')
      .then(response =>{
        console.log(response.data.cliente);
      setRepositories(response.data.cliente);
      })
      .catch(err =>{
        console.log(err)
      })
      
    },[]);
    
      return (       
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Bem Vindo,   { localStorage.getItem("nome")}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
             {['Página Inicial', 'Gerenciar', 'Relátorios', 'Sair'].map((text, index) => (
                <ListItem button key={text} onClick = {() => listI(text)}>
                  <ListItemIcon>{}</ListItemIcon>
                  <ListItemText ext primary={text}>{/*text === 'Gerenciar' ? console.log("Texte"):console.log("Texte2") */}</ListItemText>
                </ListItem>
              ))}
            </List>
            <Divider />

          </Drawer>

        
          <main className={classes.content}>
              <div className={classes.toolbar} />
                  <h2>Menu Inicial</h2>
                  
                  <div className="botao1">
                    <Button
                      variant="contained"
                      color="primary"
                      
                    >
                      Gerenciar Usuários
                    </Button>
                    </div>
                    <div className="botao1">
                      <Button
                        variant="contained"
                        color="primary"
                        
                      >
                        Gerenciar clientes
                      </Button>
                  </div>
                  <div className="botao1">
                    <Button
                      variant="contained"
                      color="primary"
                      
                    >
                      Gerenciar Produção
                    </Button>
                  </div>
                  <div className="botao1">
                    <Button
                      variant="contained"
                      color="primary"
                      
                    >
                      Gerenciar Plantio
                    </Button>
                    </div>
                    <div className="botao1">
                    <Button
                      variant="contained"
                      color="primary"
                      
                    >
                      Gerenciar Colheita
                    </Button>
                  </div>
                  <div className="botao1">
                    <Button
                      variant="contained"
                      color="primary"
                      
                    >
                      Gerenciar Seção
                    </Button>
                    </div>
                
                  <div className="botao2">
                    <Button
                      variant="contained"
                      color="primary"
                      
                    >
                      Gerenciar Planta
                    </Button>
                  </div>
                 
                  
                 
                  
                    <div className="botao2">
                    <Button
                      variant="contained"
                      color="primary"
                      
                    >
                      Gerenciar Insumos
                    </Button>
                    </div>
                    <div className="botao2">
                    <Button
                      variant="contained"
                      color="primary"
                      
                    >
                      Gerenciar Tipo de Planta
                    </Button>
                    </div>
                    <div className="botao2">
                    <Button
                      variant="contained"
                      color="primary"
                      
                    >
                      Gerenciar Pragas e Doenças
                    </Button>
                    </div>
                    <div className="botao2">
                    <Button
                      variant="contained"
                      color="primary"
                      
                    >
                      Gerenciar Fornecedores
                    </Button>
                    </div>
                    
           
          </main>
              </div>
            
        );
  
}
