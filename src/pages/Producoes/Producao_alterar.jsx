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

    const [id_plantio, setId_plantio] = useState('');
    const [id_insumo, setId_insumo] = useState('');
    const [id_p_doenca, setId_pragas_doenca] = useState('');

    const [adubacao, setAdubacao] = useState('');
    const [defensivo, setDefensivo] = useState('');
    const [date_defensivo, setDate_defensivo] = useState('');
    const [date_adubacao, setDate_adubacao] = useState('');
    const [qtd_adubacao, setQtd_adubacao] = useState('');
    const [qtd_defensivo, setQtd_defensivo] = useState('');
    const [insumos, setInsumos] = useState([]);
    const [plantios, setPlantios] = useState([]);
    const [pragas_doencas, setP_doencas] = useState([]);
    const {id_producao} = useParams()
    
    
    
    useEffect(() => {
      async function getProducao(){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
            var response = await axios.get('http://localhost:3006/producao/'+id_producao,{headers}).then().catch(err => {
              if(err.response.status ===500){
                alert('Erro no Servidor!')
              }
            })
            console.log(response.data)
            console.log(response.data.response.producao.id_plantio)

            setId_plantio(response.data.response.producao.id_plantio);
            setId_insumo(response.data.response.producao.id_insumo);
            setId_pragas_doenca(response.data.response.producao.id_p_doenca);

            setAdubacao(response.data.response.producao.adubacao);
            setDefensivo(response.data.response.producao.defensivo);
            setDate_adubacao(response.data.response.producao.data_adubacao.substring(0,10));
            setDate_defensivo(response.data.response.producao.data_defensivo.substring(0,10));
            setQtd_adubacao(response.data.response.producao.qtd_adubacao);
            setQtd_defensivo(response.data.response.producao.qtd_defensivo);

           // setId_plantio(response.data.response.producao.id_insumo);
            
      }
      async function getInsumo(){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
            var response = await axios.get('http://localhost:3006/insumo/',{headers}).then(response =>{

              setInsumos(response.data.insumo);
            })
            .catch(err => {
              if(err.response.status ===500){
                alert('Erro no Servidor!')
              }
            })
      }
      async function getPlantio(){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
            var response = await axios.get('http://localhost:3006/plantio/',{headers}).then(response =>{

              setPlantios(response.data.plantio);
            })
            .catch(err => {
              if(err.response.status ===500){
                alert('Erro no Servidor!')
              }
            })
      }
      async function getP_doenca(){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
            var response = await axios.get('http://localhost:3006/pragas_doenca/',{headers}).then(response =>{

              setP_doencas(response.data.pragas_doenca);
            })
            .catch(err => {
              if(err.response.status ===500){
                alert('Erro no Servidor!')
              }
            })
      }
      getP_doenca();
      getInsumo();
      getPlantio();
      getProducao();      
    },[]);

    async  function Alterar(){
      const data = {
        id_plantio:id_plantio,
        id_insumo:id_insumo,
        id_p_doenca:id_p_doenca,
        adubacao:adubacao,
        defensivo:defensivo,
        data_defensivo:date_defensivo,
        data_adubacao:date_adubacao,
        qtd_adubacao:qtd_adubacao,
        qtd_defensivo:qtd_defensivo
       
      }
      //console.log(data)
      if(id_plantio!=''&&id_insumo!=''&&adubacao!=''&&defensivo!=''&&qtd_defensivo!=''&&date_adubacao!=''&&date_defensivo!=''&&qtd_adubacao!=''){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        var result = await axios.patch('http://localhost:3006/producao/'+id_producao,data).then(res => {
          if(res.status ===202){
         
            alert(res.data.response.mensagem)

            window.location.replace("http://localhost:3000/producao");
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
                    Alteração de Produção
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
                    <Grid item xs={12} sm={5}>
                      <TextField
                        required
                        id="adubacao"
                        name="adubacao"
                        label="Adubacao"
                        fullWidth
                        autoComplete="adubacao"
                        value={adubacao}
                        onChange={e => setAdubacao(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        id="defensivo"
                        name="defensivo"
                        label="Defensivo"
                        fullWidth
                        autoComplete="defensivo"
                        value={defensivo}
                        onChange={e => setDefensivo(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={13} sm={4}>
                      <TextField
                        required
                        type="number"
                        InputProps={{ inputProps: { min: 0, step: 0.1 } }}
                        id="qtd_defensivo"
                        name="qtd_defensivo"
                        label="Qtd Defensivo"
                        fullWidth
                        autoComplete="qtd_adubacao"
                        value={qtd_defensivo}
                        onChange={e => setQtd_defensivo(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={13} sm={3}>
                      <TextField
                        required
                        type="number"
                        InputProps={{ inputProps: { min: 1, step: 1 } }}
                        id="qtd_adubacao"
                        name="qtd_adubacao"
                        label="Qtd Adubacao"
                        fullWidth
                        autoComplete="qtd_adubacao"
                        value={qtd_adubacao}
                        onChange={e => setQtd_adubacao(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={13} sm={4}>
                    
                    <form className={classes.container} noValidate_defensivo>
                      <TextField
                      required
                        id="date_defensivo"
                        label="Data do Defensivo"
                        type="date"
                        defaultValue=""
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={date_defensivo}
                        onChange={e => setDate_defensivo(e.target.value)}
                      />
                    </form>
                    
                    </Grid>
                    <Grid item xs={13} sm={4}>
                    
                    <form className={classes.container} noValidate_defensivo>
                      <TextField
                      required
                        id="date_adubacao"
                        label="Data de Adubação"
                        type="date"
                        defaultValue=""
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={date_adubacao}
                        onChange={e => setDate_adubacao(e.target.value)}
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
                              onClick ={Alterar}
                            >
                              Alterar Produção
                    </Button>
                    </Grid>
                </Paper>
        </main>
      </div>
          
    );
  
}
