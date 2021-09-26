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
import { useParams } from 'react-router';
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
  localStorage.setItem("id_usuario",decoded.id_usuario);
 }
 
}

export default function SecaoAlterar(){
  
    const classes = useStyles();
    const [id_usuario, setId_usuario] = useState('');
    const [descricao, setDescricao] = useState('');
    const [area, setArea] = useState('');
    const {id_secao} = useParams()
    useEffect(() => {
      async function getSecao(){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
            var response = await axios.get('http://localhost:3006/secao/'+id_secao,{headers}).then().catch(err => {
              if(err.response.status ===500){
                alert('Erro no Servidor!')
              }
            })
            console.log(response.data.secao.descricao)
            setId_usuario(response.data.secao.id_usuario);
            setDescricao(response.data.secao.descricao);
            setArea(response.data.secao.area);

      }
      getSecao();      
    },[]);

    async  function Alterar(){
      const data = {
        descricao:descricao,
        area:area
      }
      console.log(data)
      if(id_usuario!=''&&descricao!=''&&area!=''){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        var result = await axios.patch('http://localhost:3006/secao/'+id_secao,data).then(res => {
          if(res.status ===202){
            alert(res.data.response.mensagem)
            window.location.replace("http://localhost:3000/secao");
          }
        }).catch(err => {
          if(err.response.status ===500){
            alert('Erro na Alteração')
           
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
                    Alteração de Seção
                </Typography>
                <Paper className = {classes.content} >
                  <Grid container spacing={3}>
                    
                    <Grid item xs={12} sm={2}>
                      <TextField
                        required
                        id="id_usuario"
                        name="id_usuario"
                        label="ID Usuário"
                        fullWidth
                        autoComplete="id_usuario"
                        value={id_usuario}
                        onChange={e => setId_usuario(e.target.value)}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="descricao"
                        name="descricao"
                        label="Descricao"
                        fullWidth
                        autoComplete="descricao"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                       // disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        id="area"
                        name="area"
                        label="Area"
                        fullWidth
                        autoComplete="area"
                        value={area}
                        onChange={e => setArea(e.target.value)}
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
                              Alterar Seção
                    </Button>
                    </Grid>
                </Paper>
        </main>
      </div>
          
    );
  
}
