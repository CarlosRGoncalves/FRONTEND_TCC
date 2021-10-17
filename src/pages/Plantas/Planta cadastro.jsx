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
 // localStorage.setItem("id_tipo_planta",decoded.id_tipo_planta);
 }
 
}

export default function SecaoCadastro(){

  
  
    const classes = useStyles();
    const [id_tipo_planta, setId_tipo_planta] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [epoca_plantio, setEpoca_plantio] = useState('');
    const [forma_plantio, setForma_plantio] = useState('');
    const [tempo_colheita, setTempo_colheita] = useState('');
    const [tipo_plantas, setTipo_plantas] = useState([]);

    useEffect(() => {
      async  function tp(){
          const token = localStorage.getItem('token');
          const headers = { Authorization: `Bearer ${token}` };
        
          const response = await axios.get(process.env.REACT_APP_API_URL + 'tipo_planta/',{ headers })
          .then(response =>{
          //console.log(response.data.usuario);
          setTipo_plantas(response.data.tipo_planta);
          })
          .catch(err =>{
            console.log(err)
            alert(err);
          })
      }
      tp();
    },[]);
    
    
    async  function Cadastrar(){
      const data = {
        id_tipo_planta:id_tipo_planta,
        nome_planta:nome,
        descricao:descricao,
        epoca_plantio:epoca_plantio,
        forma_plantio:forma_plantio,
        tempo_colheita:tempo_colheita
      }

      if(descricao!=''&&epoca_plantio!=''&&nome!=''){
        var result = await axios.post(process.env.REACT_APP_API_URL + 'planta',data).then(res => {
          //console.log("AQUI",res.status);
          if(res.status ===201){
            alert(res.data.response.mensagem)
            window.location.replace(process.env.REACT_APP_FRONT_URL + "planta");
          }
        }).catch(err => {
          if(err.response.status ===500){
            alert('Erro no Cadastro!')
            //window.location.replace(process.env.REACT_APP_FRONT_URL + "planta/cadastro");
          }
        })

      }else{
        alert('Campo em Branco!')
      }
    }
    
 
    return (       
     
      <div className={classes.root}>
        <CssBaseline/>
        <MenuI/>
        <main className={classes.content}>
          
            <div className={classes.toolbar} />
            
                <Typography variant="h6" gutterBottom>
                    Cadastro de Plantas
                </Typography>
                <Paper className = {classes.content} >
                  <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                      <FormControl className={classes.formControl}>
                      <InputLabel id="id_tipo_planta">Tipo de Planta</InputLabel>
                      <Select
                        labelId="Tipo  de Planta"
                        id="id_tipo_planta"
                        value={id_tipo_planta}
                       onChange={e => setId_tipo_planta(e.target.value)}
                      >{tipo_plantas.map((row) =>(
                          <MenuItem value={row.id_tipo_planta}>{row.nome_tipo_planta}</MenuItem>
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
                        id="epoca_plantio"
                        name="epoca_plantio"
                        label="Epoca Plantio"
                        fullWidth
                        autoComplete="epoca_plantio"
                        value={epoca_plantio}
                        onChange={e => setEpoca_plantio(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={13} sm={3}>
                      <TextField
                        required
                        id="forma_plantio"
                        name="forma_plantio"
                        label="Forma Plantio"
                        fullWidth
                        autoComplete="forma_plantio"
                        value={forma_plantio}
                        onChange={e => setForma_plantio(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={13} sm={6}>
                      <TextField
                        required
                        id="tempo_colheita"
                        name="tempo_colheita"
                        label="Tempo de Colheita"
                        fullWidth
                        autoComplete="tempo_colheita"
                        value={tempo_colheita}
                        onChange={e => setTempo_colheita(e.target.value)}
                      />
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
                              Cadastrar Planta
                    </Button>
                    </Grid>
                </Paper>
        </main>
      </div>
          
    );
  
}
