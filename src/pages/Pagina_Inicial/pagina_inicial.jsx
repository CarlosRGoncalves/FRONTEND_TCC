import React  from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import './pagina_inicial.css';
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import MenuI from '../../components/Menu_Inicial/Menu'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useState,useEffect } from 'react';
import jwt_decode from "jwt-decode";
import green from '@material-ui/core/colors/green';
import Typography from '@material-ui/core/Typography';
import img from '../../utils/img/agri.jpg';

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
  imageList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
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
          
                <h2>P??gina Inicial</h2>
            <Paper className = {classes.content} >
                  <Typography paragraph>
                      O mercado de org??nicos no Brasil come??ou sua produ????o em grande escala no in??cio da d??cada de 90, com destaque para as iniciativas criadas pela Associa????o de Agricultores
                      Biol??gicos do Estado do Rio de Janeiro (Abio), pela Cooperativa Ecol??gica Coolmeia
                      de Porto Alegre, e pela Associa????o de Agricultura Org??nica (AAO) de S??o Paulo.
                  </Typography>
                  <Typography paragraph>
                      Diante a esse cen??rio, ?? vis??vel o crescimento da produ????o de produtos org??nicos. Assim, existe uma necessidade de solu????es eficazes tecnol??gicas para o registro do procedimento de produ????o para o pequeno produtor rural principalmente que muitas vezes n??o tem o suporte suficiente e o conhecimento para usar tais tecnologias que possa corrigir.
                  </Typography>
                  <Typography paragraph>
                      Atrav??s de pesquisas no cen??rio agr??cula, foi percebido um d??ficit de sistemas voltados aos pequenos produtores org??nicos, Por este motivo, este trabalho tem o intuito de facilitar o procedimento de registro de produ????es org??nicas para pequenos produtores. O software ?? pensado no pequeno produtor assim com intuito de ser simples e de f??cil utiliza????o.
                  </Typography>
                  
            
                </Paper>

        </main>
      </div>
          
    );
  
}
