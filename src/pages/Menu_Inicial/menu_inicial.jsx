import React  from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import './menu_inicial.css';
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import MenuI from '../../components/Menu_Inicial/Menu'

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useState,useEffect } from 'react';
import jwt_decode from "jwt-decode";
import green from '@material-ui/core/colors/green';
import Typography from '@material-ui/core/Typography';


const drawerWidth = 240;

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
  hide: {
    display: 'none',
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
 const token = localStorage.getItem("token")
 if(token){
  const decoded = jwt_decode(token);
  localStorage.setItem("nome",decoded.nome);
 }
 
}

export default function MiniDrawer (){
  
    const classes = useStyles();
    return (       
        <div className={classes.root}>
          <CssBaseline/>
          <MenuI/>
          <main className={classes.content} >
              <div className={classes.toolbar} />
              
                  <h2>Menu Inicial</h2>
              <Paper className = {classes.content} >
                  <Grid container spacing={40} >
                  
                  <div className="botao2">
                          <Button
                            variant="contained"
                            color="primary"
                            style={{backgroundColor: "#00A869"}}
                            onClick = {() => window.location.replace(process.env.REACT_APP_FRONT_URL + "cliente")}

                          >
                            Gerenciar clientes
                          </Button>
                      </div>
                      <div className="botao2">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{backgroundColor: "#00A869"}}
                          onClick = {() => window.location.replace(process.env.REACT_APP_FRONT_URL + "colheita")}

                        >
                          Gerenciar Colheita
                        </Button>
                      </div>
                      <div className="botao2">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{backgroundColor: "#00A869"}}
                          onClick = {() => window.location.replace(process.env.REACT_APP_FRONT_URL + "fornecedor")}
                        >
                          Gerenciar Fornecedores
                        </Button>
                      </div>
                      <div className="botao2">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{backgroundColor: "#00A869"}}
                          onClick = {() => window.location.replace(process.env.REACT_APP_FRONT_URL + "insumo")}

                        >
                          Gerenciar Insumos
                        </Button>
                      </div>
                      <div className="botao2">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{backgroundColor: "#00A869"}}
                          onClick = {() => window.location.replace(process.env.REACT_APP_FRONT_URL + "pedido")}

                        >
                          Gerenciar Pedidos
                        </Button>
                      </div>
                      <div className="botao2">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{backgroundColor: "#00A869"}}
                          onClick = {() => window.location.replace(process.env.REACT_APP_FRONT_URL + "planta")}

                        >
                          Gerenciar Planta
                        </Button>
                      </div>
                      <div className="botao2">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{backgroundColor: "#00A869"}}
                          onClick = {() => window.location.replace(process.env.REACT_APP_FRONT_URL + "plantio")}

                        >
                          Gerenciar Plantio
                        </Button>
                      </div>
                      <div className="botao2">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{backgroundColor: "#00A869"}}
                          onClick = {() => window.location.replace(process.env.REACT_APP_FRONT_URL + "praga_doenca")}

                        >
                           Pragas e Doenças
                        </Button>
                      </div>
                      <div className="botao2">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{backgroundColor: "#00A869"}}
                          onClick = {() => window.location.replace(process.env.REACT_APP_FRONT_URL + "producao")}

                        >
                          
                            Gerenciar Produção
                        
                        </Button>
                      </div>
                      <div className="botao2">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{backgroundColor: "#00A869"}}
                          onClick = {() => window.location.replace(process.env.REACT_APP_FRONT_URL + "produto_final")}

                        >
                          Gerenciar Produto Final
                        </Button>
                      </div>
                      <div className="botao2">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{backgroundColor: "#00A869"}}
                          onClick = {() => window.location.replace(process.env.REACT_APP_FRONT_URL + "secao")}

                        >
                          Gerenciar Seções
                        </Button>
                      </div>

                      <div className="botao2">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{backgroundColor: "#00A869"}}
                          onClick = {() => window.location.replace(process.env.REACT_APP_FRONT_URL + "tipo_planta")}
                        >
                          Gerenciar Tipo de Planta
                        </Button>
                      </div>
                      <div className="botao2">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{backgroundColor: "#00A869"}}
                          onClick = {() => window.location.replace(process.env.REACT_APP_FRONT_URL + "unidade_medida")}
                        >
                           Unidade de Medida
                        </Button>
                        </div>
                      <div className="botao2">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{backgroundColor: "#00A869"}}
                          onClick = {() => window.location.replace(process.env.REACT_APP_FRONT_URL + "usuario")}
                        >
                            Gerenciar Usuários
                        </Button>
                      </div>
                      
                      
                      
                  </Grid>
             
                  </Paper>

          </main>
        </div>
            
      );
  
}
