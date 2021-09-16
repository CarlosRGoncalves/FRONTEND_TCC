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
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
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
  localStorage.setItem("nome",decoded.nome);
 }
 
}

export default function UsuarioCadastro(){
  
    const classes = useStyles();
    const [usuarios, setUsuarios] = useState([]);
   
    useEffect(() => {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const response = axios.get('http://localhost:3006/usuario/',{ headers })
      .then(response =>{
        console.log(response.data.usuario);
      setUsuarios(response.data.usuario);
      })
      .catch(err =>{
        console.log(err)
      })
      
    },[]);
 
    return (       
      
      <div className={classes.root}>
        <CssBaseline/>
        <MenuI/>
        <main className={classes.content}>
          
            <div className={classes.toolbar} />
            
                <Typography variant="h6" gutterBottom>
                    Cadastro de Usuários
                </Typography>
                <Paper className = {classes.content} >
                  <Grid container spacing={3}>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="nome"
                        name="nome"
                        label="Nome Completo"
                        fullWidth
                        autoComplete="nome"
                        
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        autoComplete="email"
                        
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        id="telefone"
                        name="telefone"
                        label="Telefone"
                        fullWidth
                        autoComplete="telefone"
                        
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormControl className={classes.formControl}>
                      <InputLabel id="tipo_usuario">Tipo Usuário</InputLabel>
                      <Select
                        labelId="tipo_usuario"
                        id="tipo_usuario"
                        //value={age}
                      // onChange={handleChange}
                      >
                        <MenuItem value={1}>Administrador</MenuItem>
                        <MenuItem value={2}>Produtor</MenuItem>
                      
                      </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        required
                        type = "password"
                        id="senha"
                        name="senha"
                        label="Senha"
                        fullWidth
                        autoComplete="senha"
                        
                      />
                    </Grid>
                  </Grid>
                </Paper>
        </main>
      </div>
          
    );
  
}
