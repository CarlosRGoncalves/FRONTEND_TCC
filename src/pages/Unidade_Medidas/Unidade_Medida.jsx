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
import './Unidade_Medida.css';
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
  const [unidade_medida , setUnidade_medida ] = useState([]);


  useEffect(() => {
    async function unidade_medida(){
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
  
    const response = await axios.get(process.env.REACT_APP_API_URL + 'unidade_medida/',{ headers })
    .then(response =>{
    //console.log(response.data.unidade_medida );

    setUnidade_medida (response.data.unidade_medida);
    })
    .catch(err =>{
      console.log(err)
      alert(err);
    })
  }
  unidade_medida ();
  },[]);

  async function Delete(id){
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    if(window.confirm("Voc?? tem certeza que vai excluir esse unidade_medida  ?")){
      var result = await axios.delete(process.env.REACT_APP_API_URL + 'unidade_medida/'+id,{ headers }).then(res =>{
        if(res.status ===202){
          console.log(res)
          alert(res.data.response.mensagem)
          window.location.replace(process.env.REACT_APP_FRONT_URL + "unidade_medida");
        }
      }).catch(err =>{
        console.log(err)
        alert(err);
      })

  
    }
  }

  function cad() {
    window.location.replace(process.env.REACT_APP_FRONT_URL + "unidade_medida/cadastro");
  }

  function Tp_Usuario() {
    const token = localStorage.getItem('token');
    if(token){
          const decoded = jwt_decode(token);
          if(decoded.tipo_usuario == 2){
            return("true")
          }
    }
    return;
  }

  return (       
    <div className={classes.root}>
      <CssBaseline/>
      <MenuI/>
      <main className={classes.content}>
          <div className={classes.toolbar} />
          
          <h2>Unidade de Medidas</h2>
            <Grid container spacing={20}>
            <Paper className = {classes.content} >
                  <TableContainer component={Paper}>
                      <Table className={classes.table} size="small" aria-label="a dense table">
                          <TableHead>
                          <TableRow>
                              <TableCell>ID Unidade Medida </TableCell>
                              <TableCell align="center">Nome&nbsp;</TableCell>
                              
                              <TableCell align="center">Op????es&nbsp;</TableCell>
                          </TableRow>
                          </TableHead>
                          <TableBody>
                              {unidade_medida .map((row) => (
                                
                                  <TableRow key={row.id_unidade_medida }>
                                  <TableCell component="th" scope="row">
                                      {row.id_unidade_medida }
                                  </TableCell>
                                  <TableCell align="center">{row.nome_unidade_medida}</TableCell>
                                 
                                  
                                  <TableCell align="center">
                                    <ButtonGroup  aria-label="outlined primary button group">
                                        <Button color = "primary" align="center" startIcon={<CreateIcon/>} href={'/unidade_medida/alterar/'+row.id_unidade_medida } disabled = {Tp_Usuario()}></Button>
                                        <Button color = "secondary" align="center" startIcon={<DeleteIcon/>} onClick = {() => Delete(row.id_unidade_medida )} disabled = {Tp_Usuario()}></Button>
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
                                id = "cadunidade_medida"
                                variant="contained"
                                color="primary"
                                style={{backgroundColor: "#00A869"}}
                                onClick = {() => cad()}
                                disabled = {Tp_Usuario()}
                              >
                                Cadastrar Novo Unidade de Medida
                          </Button>
                    </div>
                </Paper>
                
              </Grid>
              
      </main>
    </div>   
  );
  
}
