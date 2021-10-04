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
 // localStorage.setItem("id_producao",decoded.id_producao);
 }
 
}

export default function ColheitaCadastro(){

  
  
    const classes = useStyles();
    const [id_producao, setId_producao] = useState('');
    const [id_pedido, setId_pedido] = useState('');
    
    const [date, setDate] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [producoes, setProducoes] = useState([]);
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
      async  function producao(){
          const token = localStorage.getItem('token');
          const headers = { Authorization: `Bearer ${token}` };
        
          const response = await axios.get('http://localhost:3006/producao/',{ headers })
          .then(response =>{
          //console.log(response.data.usuario);
          setProducoes(response.data.producao);
          })
          .catch(err =>{
            console.log(err)
            alert(err);
          })
      }
      async  function pedido(){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
      
        const response = await axios.get('http://localhost:3006/pedido/',{ headers })
        .then(response =>{
        //console.log(response.data.usuario);
        setPedidos(response.data.pedido);
        })
        .catch(err =>{
          console.log(err)
          alert(err);
        })
    }
      pedido();
      producao();
    },[]);
    
    
    async  function Cadastrar(){
      const data = {
        id_producao:id_producao,
        id_pedido:id_pedido,
        quantidade:quantidade,
        data_colheita:date
      }

      if(quantidade!=''&&quantidade!=''&&date!=''&&id_producao!=''&&id_pedido!=''){
        var result = await axios.post('http://localhost:3006/colheita',data).then(res => {
          //console.log("AQUI",res.status);
          if(res.status ===201){
            //console.log(res.data.response.pedidoCriado.quantidade)
            const m =res.data.response.mensagem + "\n\nID da Colheita: " + res.data.response.colheitaCriado.id_colheita            
            alert(m)
            window.location.replace("http://localhost:3000/colheita");
          }
        }).catch(err => {
          if(err.response.status ===500){
            alert('Erro no Cadastro!')
            //window.location.replace("http://localhost:3000/planta/cadastro");
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
                    Cadastro de Colheita
                </Typography>
                <Paper className = {classes.content} >
                  <Grid container spacing={3}>
                  <Grid item xs={12} sm={5}>
                      <FormControl className={classes.formControl}>
                      <InputLabel id="id_producao">ID Produção</InputLabel>
                      <Select
                            labelId="Produção"
                            id="id_producao"
                            value={id_producao}
                            onChange={e => setId_producao(e.target.value)}
                          > {producoes.map((row) =>(
                              <MenuItem value={row.id_producao}>{row.id_producao}</MenuItem>
                            ))}
                      </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <FormControl className={classes.formControl}>
                      <InputLabel id="id_pedido">ID Pedido</InputLabel>
                      <Select
                            labelId="Pedido"
                            id="pedido"
                            value={id_pedido}
                            onChange={e => setId_pedido(e.target.value)}
                          > {pedidos.map((row) =>(
                              <MenuItem value={row.id_pedido}>{row.id_pedido}</MenuItem>
                            ))}
                      </Select>
                    </FormControl>
                    </Grid>
                    
                    <Grid item xs={13} sm={5}>
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
                    <Grid item xs={13} sm={5}>
                    
                    <form className={classes.container} noValidate>
                      <TextField
                      required
                        id="date"
                        label="Data da Colheita"
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
                              Cadastrar Colheita
                    </Button>
                    </Grid>
                </Paper>
        </main>
      </div>
          
    );
  
}
