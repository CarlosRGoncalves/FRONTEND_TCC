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
import validaCpfCnpj from '../../components/Validacoes/cpfcnpj'

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

export default function FornecedorAlterar(){
  
    const classes = useStyles();
    const [cnpj, setCnpj] = useState('');
    const [nome, setNome] = useState('');
    const {id_fornecedor} = useParams()
    useEffect(() => {
      document.getElementById('cnpj').maxLength = 14

      async function getFornecedor(){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
       // console.log(id_fornecedor)
          var response = await axios.get(process.env.REACT_APP_API_URL + 'fornecedor/'+id_fornecedor,{headers}).then().catch(err => {
              if(err.response.status ===500){
                alert('Erro no Servidor!')
              }
            })
         //   console.log(response)
            setCnpj(response.data.response.fornecedor.cnpj);
            setNome(response.data.response.fornecedor.nome_fornecedor);

      }
      getFornecedor();      
    },[]);

    async  function Alterar(){
      const data = {
        cnpj:cnpj,
        nome_fornecedor:nome
      }
      if(nome!=''){
        if((cnpj.length==0||cnpj.length==14)){
          if(cnpj.length==0){
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };
            var result = await axios.patch(process.env.REACT_APP_API_URL + 'fornecedor/'+id_fornecedor,data).then(res => {
              if(res.status ===202){
                alert(res.data.response.mensagem)
                window.location.replace(process.env.REACT_APP_FRONT_URL + "fornecedor");
              }
            }).catch(err => {
              if(err.response.status ===500){
                alert('Erro na Altera????o')
              
              }
            })
        }else if(cnpj.length==14 && validaCpfCnpj(cnpj) == true){
          const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };
            var result = await axios.patch(process.env.REACT_APP_API_URL + 'fornecedor/'+id_fornecedor,data).then(res => {
              if(res.status ===202){
                alert(res.data.response.mensagem)
                window.location.replace(process.env.REACT_APP_FRONT_URL + "fornecedor");
              }
            }).catch(err => {
              if(err.response.status ===500){
                alert('Erro na Altera????o')
              
              }
            })
        }else{
          alert('Cnpj Inv??lido!')
        }
      }else{
        alert('Cnpj Inv??lido!')
      }
    }
  }
    return (       
      
      <div className={classes.root}>
        <CssBaseline/>
        <MenuI/>
        <main className={classes.content}>
          
            <div className={classes.toolbar} />
            
                <Typography variant="h6" gutterBottom>
                    Altera????o de Fornecedor
                </Typography>
                <Paper className = {classes.content} >
                  <Grid container spacing={3}>
                   
                    <Grid item xs={12} sm={4}>
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
                        id="cnpj"
                        name="cnpj"
                        label="Cnpj"
                        fullWidth
                        autoComplete="cnpj"
                        value={cnpj}
                        onChange={e => setCnpj(e.target.value)}
                       // disabled
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
                              Alterar Fornecedor
                    </Button>
                    </Grid>
                </Paper>
        </main>
      </div>
          
    );
  
}
