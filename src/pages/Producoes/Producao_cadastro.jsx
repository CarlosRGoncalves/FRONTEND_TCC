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


export default function InsumoCadastro(){

  
  
    const classes = useStyles();
    const [id_plantio, setId_plantio] = useState('');
    const [id_insumo, setId_insumo] = useState('');
    const [id_p_doenca, setId_pragas_doenca] = useState('');
    const [id_unidade_medida, setId_unidade_medida] = useState('');
 //   const [adubacao, setAdubacao] = useState('');
  //  const [defensivo, setDefensivo] = useState('');
  //  const [date_defensivo, setDate_defensivo] = useState('');
    const [date_producao, setdate_producao] = useState('');
    const [unidade_medida, setUnidade_medida] = useState([]);
    const [quantidade_producao, setquantidade_producao] = useState('');
    const [insumos, setInsumos] = useState([]);
    const [plantios, setPlantios] = useState([]);
    const [pragas_doencas, setP_doencas] = useState([]);
    

    useEffect(() => {
     
      document.getElementById('date_producao').max = new Date().toISOString().split("T")[0]

      async  function insumo(){
          const token = localStorage.getItem('token');
          const headers = { Authorization: `Bearer ${token}` };
        
          const response = await axios.get(process.env.REACT_APP_API_URL + 'insumo/',{ headers })
          .then(response =>{
          //console.log(response.data.usuario);
          setInsumos(response.data.insumo);
          })
          .catch(err =>{
            console.log(err)
            alert(err);
          })
      }
      async  function plantio(){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
      
        const response = await axios.get(process.env.REACT_APP_API_URL + 'plantio/',{ headers })
        .then(response =>{
        //console.log(response.data.usuario);
        setPlantios(response.data.plantio);
        })
        .catch(err =>{
          console.log(err)
          alert(err);
        })
    }
      async  function pragas_doenca(){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
      
        const response = await axios.get(process.env.REACT_APP_API_URL + 'pragas_doenca/',{ headers })
        .then(response =>{
        //console.log(response.data.usuario);
        setP_doencas(response.data.pragas_doenca);
        })
        .catch(err =>{
          console.log(err)
          alert(err);
        })
    }
    async  function um(){
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
    
      const response = await axios.get(process.env.REACT_APP_API_URL + 'unidade_medida/',{ headers })
      .then(response =>{
      //console.log(response.data.usuario);
      setUnidade_medida(response.data.unidade_medida);
      })
      .catch(err =>{
        console.log(err)
        alert(err);
      })
  }
      plantio();
      pragas_doenca();
      insumo();
      um();
    },[]);
    
    
    async  function Cadastrar(){
      const data = {
        id_plantio:id_plantio,
        id_insumo:id_insumo,
        id_p_doenca:id_p_doenca,
        data_producao:date_producao,
        id_unidade_medida:id_unidade_medida,
        quantidade_producao:quantidade_producao
      }

      if(id_plantio!=''&&id_insumo!=''&&date_producao!=''&&id_unidade_medida!=''&&quantidade_producao!=''){
        var result = await axios.post(process.env.REACT_APP_API_URL + 'producao',data).then(res => {
          //console.log("AQUI",res.status);
          if(res.status ===201){
            const m =res.data.response.mensagem + "\n\nID da Produção: " + res.data.response.producaoCriado.id_producao 
            alert(m)
            window.location.replace(process.env.REACT_APP_FRONT_URL + "producao");
          }
        }).catch(err => {
          if(err.response.status ===500){
            alert('Erro no Cadastro!')
            //window.location.replace(process.env.REACT_APP_FRONT_URL + "pragas_doenca/cadastro");
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
                    Cadastro de Produção
                </Typography>
                <Paper className = {classes.content} >
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                          <FormControl className={classes.formControl}>
                            <InputLabel id="id_plantio">Plantio</InputLabel>
                            <Select
                                  labelId="Plantio"
                                  id="id_plantio"
                                  value={id_plantio}
                                  onChange={e => setId_plantio(e.target.value)}
                                > {plantios.map((row) =>(
                                    <MenuItem value={row.id_plantio}>{row.id_plantio}</MenuItem>
                                  ))}
                            </Select>
                          </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                          <FormControl className={classes.formControl}>
                          <InputLabel id="id_insumo">Insumo</InputLabel>
                          <Select
                                labelId="Insumo"
                                id="id_insumo"
                                value={id_insumo}
                                onChange={e => setId_insumo(e.target.value)}
                              > {insumos.map((row) =>(
                                  <MenuItem value={row.id_insumo}>{row.nome_insumo}</MenuItem>
                                ))}
                          </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                          <FormControl className={classes.formControl}>
                          <InputLabel id="id_p_doenca">Pragas/Doencas</InputLabel>
                          <Select
                                labelId="Pragas Doenças"
                                id="id_p_doenca"
                                value={id_p_doenca}
                                onChange={e => setId_pragas_doenca(e.target.value)}
                              > {pragas_doencas.map((row) =>(
                                  <MenuItem value={row.id_p_doenca}>{row.nome_p_doenca}</MenuItem>
                                ))}
                          </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={13} sm={4}>
                      <TextField
                        required
                        type="number"
                        InputProps={{ inputProps: { min: 0, step: 0.1 } }}
                        id="quantidade_producao"
                        name="quantidade_producao"
                        label="Quantidade"
                        fullWidth
                        autoComplete="quantidade_producao"
                        value={quantidade_producao}
                        onChange={e => setquantidade_producao(e.target.value)}
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
                          > {unidade_medida.map((row) =>(
                              <MenuItem value={row.id_unidade_medida}>{row.nome_unidade_medida}</MenuItem>
                            ))}
                      </Select>
                    </FormControl>
                    </Grid>
                    
                    <Grid item xs={13} sm={4}>
                    
                        <form className={classes.container} noValidate_producao>
                          <TextField
                          required
                            id="date_producao"
                            label="Data da Produção"
                            type="date"
                            defaultValue=""
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={date_producao}
                            onChange={e => setdate_producao(e.target.value)}
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
                              Cadastrar Produção
                    </Button>
                  </Grid>
                </Paper>
        </main>
      </div>
          
    );
  
}
