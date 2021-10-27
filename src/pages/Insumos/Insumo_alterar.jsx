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



export default function InsumoAlterar(){
  
    const classes = useStyles();
    const [id_fornecedor, setId_fornecedor] = useState('');
    const [id_unidade_medida, setId_unidade_medida] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [date, setDate] = useState('');
    const [valor, setValor] = useState('');
    const [fornecedores, setFornecedores] = useState([]);
    const [medidas, setmedida] = useState([]);

    const {id_insumo} = useParams()
    
    
    
    useEffect(() => {
      
      document.getElementById('date').max = new Date().toISOString().split("T")[0]

      async function getInsumo(){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
            var response = await axios.get(process.env.REACT_APP_API_URL + 'insumo/'+id_insumo,{headers}).then().catch(err => {
              if(err.response.status ===500){
                alert('Erro no Servidor!')
              }
            })
           // console.log(response.data.response.insumo)
            setId_fornecedor(response.data.response.insumo.id_fornecedor);
            setNome(response.data.response.insumo.nome_insumo,);
            setDescricao(response.data.response.insumo.descricao);
            setQuantidade(response.data.response.insumo.quantidade);
            //console.log(response.data.response.insumo.data)

           // console.log(response.data.response.insumo.data.substring(10))
            setDate(response.data.response.insumo.data.substring(0,10));
            setValor(response.data.response.insumo.valor);
            //console.log(response.data.response.insumo.id_unidade_medida)
            setId_unidade_medida(response.data.response.insumo.id_unidade_medida);
            
      }
      async function getFornecedor(){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
            var response = await axios.get(process.env.REACT_APP_API_URL + 'fornecedor/',{headers}).then(response =>{

              setFornecedores(response.data.fornecedor);
            })
            .catch(err => {
              if(err.response.status ===500){
                alert('Erro no Servidor!')
              }
            })
      }
      async function getUnidade_medida(){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
            var response = await axios.get(process.env.REACT_APP_API_URL + 'unidade_medida/',{headers}).then(response =>{
            //  console.log(response.data.unidade_medida)
              setmedida(response.data.unidade_medida);
            })
            .catch(err => {
              if(err.response.status ===500){
                alert('Erro no Servidor!')
              }
            })
      }
      getFornecedor();
      getUnidade_medida();   
      getInsumo();      
    
    },[]);

    async  function Alterar(){
      const data = {
        id_fornecedor:id_fornecedor,
        nome_insumo:nome,
        descricao:descricao,
        quantidade:quantidade,
        data:date,
        valor:valor,
        id_unidade_medida:id_unidade_medida

      }
     // console.log(data)
      if(id_fornecedor!=''&&quantidade!=''&&date!=''&&valor!=''&&id_unidade_medida!=''){
        if(date>new Date().toISOString().split("T")[0]){
          alert("Data do Plantio preenchida Incorretamente!")
        }else{
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };
            var result = await axios.patch(process.env.REACT_APP_API_URL + 'insumo/'+id_insumo,data).then(res => {
              if(res.status ===202){
                alert(res.data.response.mensagem)
                window.location.replace(process.env.REACT_APP_FRONT_URL + "insumo");
              }
            }).catch(err => {
              if(err.response.status ===500){
                alert('Erro na Alteração!!!')
              }
            })
          }
      }else{
        alert('Campo em Branco ou Preenchido Incorretamente!!!')
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
                      <InputLabel id="id_fornecedor">Fornecedor</InputLabel>
                      <Select
                            labelId="Fornecedor"
                            id="id_fornecedor"
                            value={id_fornecedor}
                            onChange={e => setId_fornecedor(e.target.value)}
                          > {fornecedores.map((row) =>(
                              <MenuItem value={row.id_fornecedor}>{row.nome_fornecedor}</MenuItem>
                            ))}
                      </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        id="nome"
                        name="nome"
                        label="Nome"
                        fullWidth
                        autoComplete="nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        
                        id="descricao"
                        name="descricao"
                        label="Descricao"
                        fullWidth
                        autoComplete="descricao"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={13} sm={4}>
                      <TextField
                        required
                        type="number"
                        InputProps={{ inputProps: { min: 0, step: 0.1 } }}
                        id="quantidade"
                        name="quantidade"
                        label="Quantidade"
                        fullWidth
                        autoComplete="quantidade"
                        value={quantidade}
                        onChange={e => setQuantidade(e.target.value)}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={3}>
                      <FormControl className={classes.formControl}>
                      <InputLabel id="id_unidade_medida">Medida</InputLabel>
                      <Select
                            labelId="Medida"
                            id="id_unidade_medida"
                            value={id_unidade_medida}
                            onChange={e => setId_unidade_medida(e.target.value)}
                          > {
                           // console.log(medidas)
                            medidas.map((row) =>( 
                              <MenuItem value={row.id_unidade_medida}>{row.nome_unidade_medida}</MenuItem>
                            ))}
                      </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={13} sm={3}>
                    
                    <form className={classes.container} noValidate>
                      <TextField
                      required
                        id="date"
                        label="Data da Compra"
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
                    <Grid item xs={13} sm={6}>
                      <TextField
                        required
                        type="number"
                        InputProps={{ inputProps: { min: 0, step: 0.1 } }}
                        id="valor"
                        name="valor"
                        label="Valor do Insumo"
                        fullWidth
                        autoComplete="valor"
                        value={valor}
                        onChange={e => setValor(e.target.value)}
                      />
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
                              Alterar Insumo
                    </Button>
                    </Grid>
                </Paper>
        </main>
      </div>
          
    );
  
}
