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
import ModalI from '../../components/Menu_Inicial/Modal'
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
  } ,paper: {
    position: 'absolute',
    width: 380,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

{
 const token = localStorage.getItem("token")
 if(token){
  const decoded = jwt_decode(token);
 // localStorage.setItem("id_produto_final",decoded.id_produto_final);
 }
 
}

export default function PedidoCadastro(){

  
  
    const classes = useStyles();
    const [id_produto_final, setId_produto_final] = useState('');
    const [id_cliente, setId_cliente] = useState('');
    const [status, setStatus] = useState('');
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [date, setDate] = useState('');
    const [valor, setValor] = useState('');
    const [produtos_finais, setProdutos_finais] = useState([]);
    const [clientes, setClientes] = useState([]);
    
    useEffect(() => {
      async  function prod_final(){
          const token = localStorage.getItem('token');
          const headers = { Authorization: `Bearer ${token}` };
        
          const response = await axios.get(process.env.REACT_APP_API_URL + 'produto_final/',{ headers })
          .then(response =>{
          //console.log(response.data.usuario);
          setProdutos_finais(response.data.produto_final);
          })
          .catch(err =>{
            //console.log(err)
            alert(err);
          })
      }
      async  function cliente(){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
      
        const response = await axios.get(process.env.REACT_APP_API_URL + 'cliente/',{ headers })
        .then(response =>{
        //console.log(response.data.usuario);
        setClientes(response.data.cliente);
        })
        .catch(err =>{
          //console.log(err)
          alert(err);
        })
    }
      cliente();
      prod_final();
    },[]);
    
    
    async  function Cadastrar(){
      const data = {
        id_produto_final:id_produto_final,
        id_cliente:id_cliente,
        status:status,
        descricao:descricao,
        quantidade:quantidade,
        data:date
      }

      if(descricao!=''&&quantidade!=''&&status!=''&&date!=''){
        var result = await axios.post(process.env.REACT_APP_API_URL + 'pedido',data).then(res => {
          //console.log("AQUI",res.status);
          if(res.status ===201){
            //console.log(res.data.response.pedidoCriado.valor)
            const m =res.data.response.mensagem + "\n\nID do Pedido: " + res.data.response.pedidoCriado.id_pedido + "\nValor do Pedido: " + res.data.response.pedidoCriado.valor+"R$"
            alert(m)
            window.location.replace(process.env.REACT_APP_FRONT_URL + "pedido");
          }
        }).catch(err => {
          if(err.response.status ===500){
            alert('Erro no Cadastro!')
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
                    Cadastro de Pedido
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
                              onClick ={Cadastrar}
                            >
                              Cadastrar Pedido
                    </Button>
                    </Grid>
                </Paper>
        </main>
      </div>
          
    );
  
}
