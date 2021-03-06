import React  from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import MenuI from '../../components/Menu_Inicial/Menu'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useState } from 'react';
import jwt_decode from "jwt-decode";
import green from '@material-ui/core/colors/green';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
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

export default function SecaoCadastro(){
  
    const classes = useStyles();
    const [descricao, setDescricao] = useState('');
    const [nome, setNome] = useState('');
    
    
    
    async  function Cadastrar(){
      const data = {
        nome_p_doenca:nome,
        descricao:descricao,
       
      }

      if(descricao!=''&&nome!=''){
        var result = await axios.post(process.env.REACT_APP_API_URL + 'pragas_doenca',data).then(res => {
          //console.log("AQUI",res.status);
          if(res.status ===201){
            alert(res.data.response.mensagem)
            window.location.replace(process.env.REACT_APP_FRONT_URL + "praga_doenca");
          }
        }).catch(err => {
          if(err.response.status ===500){
            alert('Erro no Cadastro!')
            
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
                    Cadastro Pragas/Doen??as
                </Typography>
                <Paper className = {classes.content} >
                  <Grid container spacing={3}>
                  <Grid item xs={13} sm={6}>
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
                              Cadastrar Pragas/Doen??as
                    </Button>
                    </Grid>
                </Paper>
        </main>
      </div>
          
    );
  
}
