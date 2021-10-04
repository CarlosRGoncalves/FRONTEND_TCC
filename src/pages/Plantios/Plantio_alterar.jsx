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


export default function PedidoAlterar(){
  
    const classes = useStyles();


    const [id_secao, setId_secao] = useState('');
    const [id_planta, setId_planta] = useState('');
   
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [date, setDate] = useState('');
    const [valor, setValor] = useState('');
    const [secoes, setSecoes] = useState([]);
    const [plantas, setPlantas] = useState([]);
    const {id_plantio} = useParams()
    
    
    
    useEffect(() => {
      async function getPlantio(){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
            var response = await axios.get('http://localhost:3006/plantio/'+id_plantio,{headers}).then().catch(err => {
              if(err.response.status ===500){
                alert('Erro no Servidor!')
              }
            })
            //console.log(response.data)
            setId_secao(response.data.response.plantio.id_secao);
            setId_planta(response.data.response.plantio.id_planta);
            setDescricao(response.data.response.plantio.descricao);
            setQuantidade(response.data.response.plantio.quantidade);
            setValor(response.data.response.plantio.valor_custo);

            setDate(response.data.response.plantio.data_plantio.substring(0,10));
           // setId_secao(response.data.response.plantio.id_secao);
            
      }
      async function getSecao(){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
            var response = await axios.get('http://localhost:3006/secao/',{headers}).then(response =>{

              setSecoes(response.data.secao);
            })
            .catch(err => {
              if(err.response.status ===500){
                alert('Erro no Servidor!')
              }
            })
      }
      async function getPlanta(){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
            var response = await axios.get('http://localhost:3006/planta/',{headers}).then(response =>{

              setPlantas(response.data.planta);
            })
            .catch(err => {
              if(err.response.status ===500){
                alert('Erro no Servidor!')
              }
            })
      }
      getPlanta();
      getSecao();
      getPlantio();      
    },[]);

    async  function Alterar(){
      const data = {
        id_secao:id_secao,
        id_planta:id_planta,
        descricao:descricao,
        quantidade:quantidade,
        data_plantio:date,
        valor_custo:valor
       
      }
      //console.log(data)
      if(id_secao!=''&&id_planta!=''&&descricao!=''&&quantidade!=''&&date!=''&&valor!=''){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        var result = await axios.patch('http://localhost:3006/plantio/'+id_plantio,data).then(res => {
          if(res.status ===202){
         
            alert(res.data.response.mensagem)

            window.location.replace("http://localhost:3000/plantio");
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
                    Alteração de Plantios
                </Typography>
                <Paper className = {classes.content} >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                      <FormControl className={classes.formControl}>
                      <InputLabel id="id_secao">Seção</InputLabel>
                      <Select
                            labelId="Seção"
                            id="id_secao"
                            value={id_secao}
                            onChange={e => setId_secao(e.target.value)}
                          > {secoes.map((row) =>(
                              <MenuItem value={row.id_secao}>{row.id_secao}</MenuItem>
                            ))}
                      </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl className={classes.formControl}>
                      <InputLabel id="id_planta">Planta</InputLabel>
                      <Select
                            labelId="Planta"
                            id="planta"
                            value={id_planta}
                            onChange={e => setId_planta(e.target.value)}
                          > {plantas.map((row) =>(
                              <MenuItem value={row.id_planta}>{row.nome_planta}</MenuItem>
                            ))}
                      </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={13} sm={4}>
                    
                    <form className={classes.container} noValidate>
                      <TextField
                      required
                        id="date"
                        label="Data do Plantio"
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
                      <TextField
                        required
                        type="number"
                        InputProps={{ inputProps: { min: 0, step: 0.1 } }}
                        id="valor"
                        name="valor"
                        label="Valor do Plantio"
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
                              Alterar Pedido
                    </Button>
                    </Grid>
                </Paper>
        </main>
      </div>
          
    );
  
}
