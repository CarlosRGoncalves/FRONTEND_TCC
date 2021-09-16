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
    const [repositories, setRepositories] = useState([]);
   
    useEffect(() => {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const response = axios.get('http://localhost:3006/cliente/',{ headers })
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
          <CssBaseline/>
          <MenuI/>
          <main className={classes.content} >
              <div className={classes.toolbar} />
              
                  <h2>Menu Inicial</h2>
              <Paper className = {classes.content} >
                  <Grid container spacing={40} >
                  
                    
                    
                      <div className="botao1">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{backgroundColor: "#00A869"}}
                          onClick = {() => window.location.replace("http://localhost:3000/USUARIO")}
                        >
                            Gerenciar Usuários
                        </Button>
                      </div>
                      <div className="botao1">
                          <Button
                            variant="contained"
                            color="primary"
                            style={{backgroundColor: "#00A869"}}
                          >
                            Gerenciar clientes
                          </Button>
                      </div>
                      <div className="botao1">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{backgroundColor: "#00A869"}}
                        >
                          
                            Gerenciar Produção
                        
                        </Button>
                      </div>
                      <div className="botao1">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{backgroundColor: "#00A869"}}
                        >
                          Gerenciar Plantio
                        </Button>
                      </div>
                      <div className="botao1">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{backgroundColor: "#00A869"}}
                        >
                          Gerenciar Colheita
                        </Button>
                      </div>
                      <div className="botao1">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{backgroundColor: "#00A869"}}
                        >
                          Gerenciar Seções
                        </Button>
                      </div>
                    
                      <div className="botao2">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{backgroundColor: "#00A869"}}
                        >
                          Gerenciar Planta
                        </Button>
                      </div>
                      <div className="botao2">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{backgroundColor: "#00A869"}}
                        >
                          Gerenciar Insumos
                        </Button>
                      </div>
                      <div className="botao2">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{backgroundColor: "#00A869"}}
                        >
                          Gerenciar Tipo de Planta
                        </Button>
                      </div>
                      <div className="botao2">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{backgroundColor: "#00A869"}}
                        >
                           Pragas e Doenças
                        </Button>
                      </div>
                      <div className="botao2">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{backgroundColor: "#00A869"}}
                        >
                          Gerenciar Fornecedores
                        </Button>
                      </div>
                      <div className="botao2">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{backgroundColor: "#00A869"}}
                        >
                          Gerenciar Produto Final
                        </Button>
                      </div>
                   
                  </Grid>
             
                  </Paper>

          </main>
        </div>
            
      );
  
}
