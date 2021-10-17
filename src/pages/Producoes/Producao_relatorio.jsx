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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Chip from '@material-ui/core/Chip';

import './Producao.css';
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
 // localStorage.setItem("id_produto_final",decoded.id_produto_final);
 }
 
}

export default function ProducaoRelatorio(){

  
  
    const classes = useStyles();
   
    const [dateInicial, setDateI] = useState('');
    const [dateFinal, setDateF] = useState('');
    const [producoes, setProducoes] = useState([]);

    useEffect(() => {
      
    },[]);
    
    
    async  function Cadastrar(){
      const data = {
        
        data_inicial:dateInicial,
        data_final:dateFinal,


      }

      if(dateInicial!='' && dateFinal!=''){
        var result = await axios.post(process.env.REACT_APP_API_URL + 'producao/relatorio',data).then(res => {
          //console.log("AQUI",res.status);
          if(res.status ===200){
           // console.log(res.data.producao)
            setProducoes(res.data.producao);
           // window.location.replace("http://localhost:3000/producao");
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
                    Relatório de Produções
                </Typography>
                <Paper className = {classes.content} >
                  <Grid container spacing={3}>
                  
                   
                    <Grid item xs={13} sm={4}>
                    
                    <form className={classes.container} noValidate>
                      <TextField
                      required
                        id="dateInicial"
                        label="Data Início Produções"
                        type="date"
                        defaultValue=""
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={dateInicial}
                        onChange={e => setDateI(e.target.value)}
                      />
                    </form>
                    
                    </Grid>
                    <Grid item xs={13} sm={4}>
                    
                    <form className={classes.container} noValidate>
                      <TextField
                      required
                        id="dateFinal"
                        label="Data Final Produções"
                        type="date"
                        defaultValue=""
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={dateFinal}
                        onChange={e => setDateF(e.target.value)}
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
                              Gerar Relatório 
                    </Button>
                  </Grid>
                </Paper>

                <Paper className = {classes.content} >
                  <TableContainer component={Paper}>
                      <Table className={classes.table} size="small" aria-label="a dense table">
                          <TableHead>
                          <TableRow>
                              <TableCell>ID Produção</TableCell>
                              <TableCell align="center">ID Plantio</TableCell>
                              <TableCell align="center">Insumo</TableCell>
                              <TableCell align="center">Pragas/Doença</TableCell>
                              <TableCell align="center">Adubação</TableCell>
                              <TableCell align="center">Defensivo&nbsp;</TableCell>
                              <TableCell align="center">Data Defensivo&nbsp;</TableCell>
                              <TableCell align="center">Data Adubação&nbsp;</TableCell>
                              <TableCell align="center">Qtd Adubação&nbsp;</TableCell>
                              <TableCell align="center">Qtd Defensivo&nbsp;</TableCell>
                              <TableCell align="center">Data Plantio&nbsp;</TableCell>
                          </TableRow>
                          </TableHead>
                          <TableBody>
                              {producoes.map((row) => (
                                  <TableRow key={row.id_producao}>
                                  <TableCell component="th" scope="row">
                                      {row.id_producao}
                                  </TableCell>
                                  <TableCell align="center">{row.id_plantio}</TableCell>
                                  <TableCell align="center">{row.nome_insumo}</TableCell>
                                  <TableCell align="center">{row.nome_p_doenca}</TableCell>

                                  
                                  <TableCell align="center">{row.adubacao}</TableCell>
                                  <TableCell align="center">{row.defensivo}</TableCell>
                                  <TableCell align="center">{row.data_defensivo.substring(0,10)}</TableCell>
                                  <TableCell align="center">{row.data_adubacao.substring(0,10)}</TableCell>

                                  <TableCell align="center">{row.qtd_adubacao} </TableCell>
                                  <TableCell align="center">{row.qtd_defensivo} </TableCell>
                                  <TableCell align="center"><Chip label={row.data_plantio.substring(0,10)} color="primary"/> </TableCell>
                                  

                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer>
                    <br/>
                    
                </Paper>

        </main>
      </div>
          
    );
  
}
