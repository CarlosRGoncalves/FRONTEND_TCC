import React  from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import MenuI from '../../components/Menu_Inicial/Menu'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useState,useEffect } from 'react';
import jwt_decode from "jwt-decode";
import green from '@material-ui/core/colors/green';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import './Producao.css';
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
  const [producoes, setProducoes] = useState([]);


  useEffect(() => {
    async function producao(){
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
    
      const response = axios.get(process.env.REACT_APP_API_URL + 'producao/',{ headers })
      .then(response =>{
      //console.log(response.data.usuario);
      setProducoes(response.data.producao);
      })
      .catch(err =>{
        console.log(err)
        alert(err);
      })
    }
    producao();
  },[]);

  async function Delete(id){
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    if(window.confirm("Você tem certeza que vai excluir essa Produção?")){
      var result = await axios.delete(process.env.REACT_APP_API_URL + 'producao/'+id,{ headers }).then(res =>{
        if(res.status ===202){
          console.log(res)
          alert(res.data.response.mensagem)
          window.location.replace(process.env.REACT_APP_FRONT_URL + "producao");
        }
      }).catch(err =>{
        console.log(err)
        alert(err);
      })

  
    }
  }

  function cad() {
    window.location.replace(process.env.REACT_APP_FRONT_URL + "producao/cadastro");
  }

  function Tp_Usuario() {
   /* const token = localStorage.getItem('token');
    if(token){
          const decoded = jwt_decode(token);
          if(decoded.tipo_usuario == 2){
            return("true")
          }
    }*/
    return;
  }

  return (       
    <div className={classes.root}>
      <CssBaseline/>
      <MenuI/>
      <main className={classes.content}>
          <div className={classes.toolbar} />
          
          <h2>Produções</h2>
            <Grid container spacing={20}>
            <Paper className = {classes.content} >
                  <TableContainer component={Paper}>
                      <Table className={classes.table} size="small" aria-label="a dense table">
                          <TableHead>
                          <TableRow>
                              <TableCell>ID Produção</TableCell>
                              <TableCell align="center">ID Plantio</TableCell>
                              <TableCell align="center">Insumo</TableCell>
                              <TableCell align="center">Pragas/Doença</TableCell>
                              <TableCell align="center">Adubação</TableCell>
                              <TableCell align="center">Defensivo&nbsp;</TableCell>
                              <TableCell align="center">Data Defensivo&nbsp;</TableCell>
                              <TableCell align="center">Data Adubação&nbsp;</TableCell>
                              <TableCell align="center">Qtd Adubação&nbsp;</TableCell>
                              <TableCell align="center">Qtd Defensivo&nbsp;</TableCell>
                              <TableCell align="center">Opções&nbsp;</TableCell>
                          </TableRow>
                          </TableHead>
                          <TableBody>
                              {producoes.map((row) => (
                                  <TableRow key={row.id_producao}>
                                  <TableCell component="th" scope="row">
                                      {row.id_producao}
                                  </TableCell>
                                  <TableCell align="center">{row.id_plantio}</TableCell>
                                  <TableCell align="center">{row.nome_insumo}</TableCell>
                                  <TableCell align="center">{row.nome_p_doenca}</TableCell>

                                  
                                  <TableCell align="center">{row.adubacao}</TableCell>
                                  <TableCell align="center">{row.defensivo}</TableCell>
                                  <TableCell align="center">{row.data_defensivo.substring(0,10)}</TableCell>
                                  <TableCell align="center">{row.data_adubacao.substring(0,10)}</TableCell>

                                  <TableCell align="center">{row.qtd_adubacao} </TableCell>
                                  <TableCell align="center">{row.qtd_defensivo} </TableCell>

                                  <TableCell align="right">
                                    <ButtonGroup  aria-label="outlined primary button group">
                                        <Button color = "primary" align="center" startIcon={<CreateIcon/>} href={'/producao/alterar/'+row.id_producao} disabled = {Tp_Usuario()}></Button>
                                        <Button color = "secondary" align="center" startIcon={<DeleteIcon/>} onClick = {() => Delete(row.id_producao)} disabled = {Tp_Usuario()}></Button>
                                    </ButtonGroup>
                                  </TableCell>

                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer>
                    <br/>
                    <div >
                          <Button
                                id = "cadProducao"
                                variant="contained"
                                color="primary"
                                style={{backgroundColor: "#00A869"}}
                                onClick = {() => cad()}
                                disabled = {Tp_Usuario()}
                              >
                                Cadastrar Nova Produção
                          </Button>
                    </div>
                </Paper>
                
              </Grid>
              
      </main>
    </div>   
  );
  
}
