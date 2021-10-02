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
import { useParams } from 'react-router';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
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
  localStorage.setItem("id_produto_final",decoded.id_produto_final);
 }
 
}

export default function PedidoAlterar(){
  
    const classes = useStyles();

    const [id_produto_final, setId_produto_final] = useState('');
    const [id_cliente, setId_cliente] = useState('');
    const [status, setStatus] = useState('');
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [date, setDate] = useState('');
    const [produtos_finais, setProdutos_finais] = useState([]);
    const [clientes, setClientes] = useState([]);
    const {id_pedido} = useParams()
    
    
    
    useEffect(() => {
      async function getPedido(){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
            var response = await axios.get('http://localhost:3006/pedido/'+id_pedido,{headers}).then().catch(err => {
              if(err.response.status ===500){
                alert('Erro no Servidor!')
              }
            })
          
            setId_produto_final(response.data.pedido.id_produto_final);
            setId_cliente(response.data.pedido.id_cliente);
            setStatus(response.data.pedido.status);
            setDescricao(response.data.pedido.descricao);
            setQuantidade(response.data.pedido.quantidade);

            setDate(response.data.pedido.data.substring(0,10));
           // setId_produto_final(response.data.response.pedido.id_produto_final);
            
      }
      async function getProduto_final(){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
            var response = await axios.get('http://localhost:3006/produto_final/',{headers}).then(response =>{

              setProdutos_finais(response.data.produto_final);
            })
            .catch(err => {
              if(err.response.status ===500){
                alert('Erro no Servidor!')
              }
            })
      }
      async function getCliente(){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
            var response = await axios.get('http://localhost:3006/cliente/',{headers}).then(response =>{

              setClientes(response.data.cliente);
            })
            .catch(err => {
              if(err.response.status ===500){
                alert('Erro no Servidor!')
              }
            })
      }
      getCliente();
      getProduto_final();
      getPedido();      
    },[]);

    async  function Alterar(){
      const data = {
        id_produto_final:id_produto_final,
        id_cliente:id_cliente,
        status:status,
        descricao:descricao,
        quantidade:quantidade,
        data:date,
       
      }
      //console.log(data)
      if(id_produto_final!=''&&descricao!=''&&quantidade!=''&&date!=''){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        var result = await axios.patch('http://localhost:3006/pedido/'+id_pedido,data).then(res => {
          if(res.status ===202){
          const m ="Pedido Alterado com Sucesso!!!\n" + "\nID do Pedido: " + res.data.response.pedidoCriado.id_pedido + "\nValor do Pedido: " + res.data.response.pedidoCriado.valor+" R$"
          //console.log(res.data.response.pedidoCriado.valor)
            alert(m)
            window.location.replace("http://localhost:3000/pedido");
          }
        }).catch(err => {
          if(err.response.status ===500){
            alert('Erro na Alteração')
           
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
                    Alteração de Insumos
                </Typography>
                <Paper className = {classes.content} >
                  <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                      <FormControl className={classes.formControl}>
                      <InputLabel id="id_produto_final">Produto Final</InputLabel>
                      <Select
                            labelId="Produto Final"
                            id="id_produto_final"
                            value={id_produto_final}
                            onChange={e => setId_produto_final(e.target.value)}
                          > {produtos_finais.map((row) =>(
                              <MenuItem value={row.id_produto_final}>{row.nome}    Valor =    {row.valor}R$</MenuItem>
                            ))}
                      </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl className={classes.formControl}>
                      <InputLabel id="id_cliente">Cliente</InputLabel>
                      <Select
                            labelId="Cliente"
                            id="cliente"
                            value={id_cliente}
                            onChange={e => setId_cliente(e.target.value)}
                          > {clientes.map((row) =>(
                              <MenuItem value={row.id_cliente}>{row.email}</MenuItem>
                            ))}
                      </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="status">Status Pagamento</InputLabel>
                      <Select
                        labelId="status"
                        id="status"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                      >
                        <MenuItem value="Pago">Pago</MenuItem>
                        <MenuItem value="Não Pago">Não Pago</MenuItem>
                      
                      </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        required
                        id="descricao"
                        name="descricao"
                        label="Descricao"
                        fullWidth
                        autoComplete="descricao"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={13} sm={3}>
                      <TextField
                        required
                        type="number"
                        InputProps={{ inputProps: { min: 1, step: 1 } }}
                        id="quantidade"
                        name="quantidade"
                        label="Quantidade"
                        fullWidth
                        autoComplete="quantidade"
                        value={quantidade}
                        onChange={e => setQuantidade(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={13} sm={4}>
                    
                    <form className={classes.container} noValidate>
                      <TextField
                      required
                        id="date"
                        label="Data do Pedido"
                        type="date"
                        defaultValue=""
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={date}
                        onChange={e => setDate(e.target.value)}
                      />
                    </form>
                    
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <br/>
                    <Button                              
                              variant="contained"
                              color="primary"
                              style={{backgroundColor: "#00A869"}}
                              onClick ={Alterar}
                            >
                              Alterar Pedido
                    </Button>
                    </Grid>
                </Paper>
        </main>
      </div>
          
    );
  
}
