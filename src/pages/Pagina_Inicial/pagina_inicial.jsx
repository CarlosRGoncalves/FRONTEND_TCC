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
                <Typography paragraph>
                O mercado de orgânicos no Brasil começou sua produção em grande escala no início da década de 90, com destaque para as iniciativas criadas pela Associação de Agricultores
Biológicos do Estado do Rio de Janeiro (Abio), pela Cooperativa Ecológica Coolmeia
de Porto Alegre, e pela Associação de Agricultura Orgânica (AAO) de São Paulo em (BAPTISTA DA COSTA ET AL., 2017).
                </Typography>
                <Typography paragraph>
                Diante a esse cenário, é visível o crescimento da produção de produtos orgânicos. Assim, existe uma necessidade de soluções eficazes tecnológicas para o registro do procedimento de produção para o pequeno produtor rural principalmente que muitas vezes não tem o suporte suficiente e o conhecimento para usar tais tecnologias que possa corrigir.
                </Typography>
                <Typography paragraph>
                Através de pesquisas no cenário agrícula, foi percebido um déficit de sistemas voltados aos pequenos produtores orgânicos, Por este motivo, este trabalho tem o intuito de facilitar o procedimento de registro de produções orgânicas para pequenos produtores. O software é pensado no pequeno produtor assim com intuito de ser simples e de fácil utilização.
                 </Typography>
                 
             


          </main>
        </div>
            
      );
  
}
