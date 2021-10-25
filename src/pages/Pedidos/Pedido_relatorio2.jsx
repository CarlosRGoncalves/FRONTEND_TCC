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
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Chip from '@material-ui/core/Chip';
import './Pedido.css';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
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
  formControl:{
    width:'100%'
  }
}));

{
 const token = localStorage.getItem("token")
 if(token){
  const decoded = jwt_decode(token);
 // localStorage.setItem("id_produto_final",decoded.id_produto_final);
 }
 
}

export default function PedidoRelatorio(){

  
  
    const classes = useStyles();
   
    const [nome_cliente, setNome_cliente] = useState('');
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
      
    },[]);
    
    
    async  function Cadastrar(){
      const data = {
        
        nome_cliente:nome_cliente
        


      }

      if(nome_cliente!=''){
        var result = await axios.post(process.env.REACT_APP_API_URL + 'pedido/relatorio2',data).then(res => {
          //console.log("AQUI",res.status);
          if(res.status ===200){
           if(res.data.quantidade!=0)
              setPedidos(res.data.pedido);
            else
              alert("Não foi encontrado nenhum Pedido para esse Cliente!!!")
           // window.location.replace(process.env.REACT_APP_FRONT_URL + "pedido");
          }
        }).catch(err => {
          if(err.response.status ===500){
            alert('Erro no Cadastro!!!')
            //window.location.replace(process.env.REACT_APP_FRONT_URL + "planta/cadastro");
          }
        })

      }else{
        alert('Campo em Branco ou Preenchido Incorretamente!')
      }
    }
    
 
    return (       
     
      <div className={classes.root}>
        <CssBaseline/>
        <MenuI/>
        <main className={classes.content}>
          
            <div className={classes.toolbar} />
            
                <Typography variant="h6" gutterBottom>
                    Relatório de Pedidos
                </Typography>
                <Paper className = {classes.content} >
                  <Grid container spacing={3}>
                  
                   
                    <Grid item xs={13} sm={4}>
                    
                    <form className={classes.container} noValidate>
                      <TextField
                      required
                        id="nome_cliente"
                        label="Nome do Cliente"
                        
                        defaultValue=""
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={nome_cliente}
                        onChange={e => setNome_cliente(e.target.value)}
                      />
                    </form>
                    
                    </Grid>
                    
                  
                  <Grid item xs={12} sm={5}>
                    <br/>
                    <Button
                              
                              variant="contained"
                              color="primary"
                              style={{backgroundColor: "#00A869"}}
                              onClick ={Cadastrar}
                            >
                              Gerar Relatório 
                    </Button>
                  </Grid>

                  </Grid>
                </Paper>
                <br/>
                <Paper className = {classes.content} >
                <TableContainer component={Paper}>
                      <Table className={classes.table} size="small" aria-label="a dense table">
                          <TableHead>
                          <TableRow>
                              <TableCell>ID Pedido</TableCell>
                              <TableCell align="center">Produto Final</TableCell>
                              <TableCell align="center">Cliente</TableCell>
                              <TableCell align="center">Status</TableCell>
                              <TableCell align="center">Descricão</TableCell>
                              <TableCell align="center">Quantidade&nbsp;</TableCell>
                              <TableCell align="center">Data&nbsp;</TableCell>
                              <TableCell align="center">Valor do Produto Vendido&nbsp;</TableCell>
                              <TableCell align="center">Valor Final do Pedido&nbsp;</TableCell>
                          </TableRow>
                          </TableHead>
                          <TableBody>
                              {pedidos.map((row) => (
                                  <TableRow key={row.id_pedido}>
                                  <TableCell component="th" scope="row">
                                      {row.id_pedido}
                                  </TableCell>
                                  <TableCell align="center">{row.nome_produto_final}</TableCell>
                                  <TableCell align="center">{row.nome_cliente}</TableCell>

                                  <TableCell align="center">{row.status ==='Pago'?<Chip label="Pago" color="primary"/>:<Chip label="Não Pago" color="secondary" />}</TableCell>
                                  <TableCell align="center">{row.descricao}</TableCell>
                                  <TableCell align="center">{row.quantidade}</TableCell>
                                  <TableCell align="center">{row.data.substring(0,10)}</TableCell>
                                  <TableCell align="center">{row.valor_produto_vendido} R$</TableCell>

                                  <TableCell align="center">{row.valor} R$</TableCell>
                                 

                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer>


                </Paper>

        </main>
      </div>
          
    );
  
}
