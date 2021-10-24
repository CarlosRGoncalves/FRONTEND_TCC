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
    const [date_producao, setdate_producao] = useState('');
    const [unidade_medida, setunidade_medida] = useState('');
    const [quantidade_producao, setquantidade_producao] = useState('');
    const {id_producao} = useParams()
    
    
    
    useEffect(() => {
      document.getElementById('date_producao').max = new Date().toISOString().split("T")[0]
      
      async function getProducao(){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
            var response = await axios.get(process.env.REACT_APP_API_URL + 'producao/'+id_producao,{headers}).then().catch(err => {
              if(err.response.status ===500){
                alert('Erro no Servidor!')
              }
            })
            console.log(response.data)
            console.log(response.data.response.producao.id_plantio)

            setId_plantio(response.data.response.producao.id_plantio);
            setId_insumo(response.data.response.producao.id_insumo);
            
            if(response.data.response.producao.id_p_doenca == null)
              setId_pragas_doenca('');
            else
              setId_pragas_doenca(response.data.response.producao.id_p_doenca);

            if(response.data.response.producao.quantidade_producao == null)
              setquantidade_producao('');
            else
              setquantidade_producao(response.data.response.producao.quantidade_producao);
              
            if(response.data.response.producao.unidade_medida == null)
              setunidade_medida('');
            else
             setunidade_medida(response.data.response.producao.unidade_medida);

            if(response.data.response.producao.data_producao == null)
              setdate_producao('');
            else
              setdate_producao(response.data.response.producao.data_producao.substring(0,10));
           
           // setId_plantio(response.data.response.producao.id_insumo);
            
      }
      async function getInsumo(){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
            var response = await axios.get(process.env.REACT_APP_API_URL + 'insumo/',{headers}).then(response =>{

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
            var response = await axios.get(process.env.REACT_APP_API_URL + 'plantio/',{headers}).then(response =>{

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
            var response = await axios.get(process.env.REACT_APP_API_URL + 'pragas_doenca/',{headers}).then(response =>{

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
        data_producao:date_producao,
        unidade_medida:unidade_medida,
        quantidade_producao:quantidade_producao
       
      }
      //console.log(data)
      if(id_plantio!=''&&id_insumo!=''&&date_producao!=''&&unidade_medida!=''&&quantidade_producao!=''){
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        var result = await axios.patch(process.env.REACT_APP_API_URL + 'producao/'+id_producao,data).then(res => {
          if(res.status ===202){
         
            alert(res.data.response.mensagem)

            window.location.replace(process.env.REACT_APP_FRONT_URL + "producao");
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
                        <InputLabel id="unidade_medida">Medida</InputLabel>
                        <Select
                        
                          labelId="unidade_medida"
                          id="unidade_medida"
                          value={unidade_medida}
                          onChange={e => setunidade_medida(e.target.value)}
                        >
                          <MenuItem value={"kg"}>kg	</MenuItem>
                          <MenuItem value={"g"}>g	</MenuItem>
                          <MenuItem value={"mg"}>mg	</MenuItem>
                        
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
