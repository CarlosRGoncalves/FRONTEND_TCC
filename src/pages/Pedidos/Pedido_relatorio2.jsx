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
import './Pedido.css';
import pedidosPDF from '../../components/Relatorios/pedidos.jsx'
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

export default function PedidoRelatorio(){

  
  
    const classes = useStyles();
   
    const [nome_cliente, setNome_cliente] = useState('');
    const [pedidos, setPedidos] = useState([]);
    const [pedidosRel, setPedidosRel] = useState([]);

    const [status, setStatus] = useState('');
    const [dateInicial, setDateI] = useState('');
    const [dateFinal, setDateF] = useState('');

    useEffect(() => {
      
    },[]);
    
    
    async  function Cadastrar(isPdf){
      const data = {
        
        nome_cliente:nome_cliente,
        status:status,
        data_inicial:dateInicial,
        data_final:dateFinal
        


      }
      var teste; 
      if(nome_cliente!=''&&status!=''){
        if((dateInicial != '' && dateFinal != '')||(dateInicial == '' && dateFinal == ''))
        {
          var result = await axios.post(process.env.REACT_APP_API_URL + 'pedido/relatorio2',data).then(res => {
            //console.log("AQUI",res.status);
            if(res.status ===200){
            if(res.data.quantidade!=0){
              setPedidos(res.data.pedido);
              teste = res.data.pedido;
            }
                
              else
              {
                  alert("Não foi encontrado nenhum Pedido para esse Cliente!!!")
                  throw "Erro"
              }
            // window.location.replace(process.env.REACT_APP_FRONT_URL + "pedido");
            }
          }).catch(err => {
            console.log(err)
            if(err.response && err.response.status === 500){
              alert('Erro no Cadastro!!!')
              return
             
            }
            return
          })
        }else{
          alert('É obrigatório que Data Final e Inicial sejam preenchidas ou ambas não podem estar assinaladas!')
          return;
        }

      }else{
        alert('Nome do Cliente e Status do Pagamento são obrigatórios!!!')
        return;
      }
      //console.log(teste)
      if(isPdf && teste){
        console.log("entrou")
        document.getElementById('tab').style.display = 'none'
        pedidosPDF(teste)
      }else{
        document.getElementById('tab').style.display = 'table-row-group'
      }

    }
    
 
    return (       
     
      <div className={classes.root}>
        <CssBaseline/>
        <MenuI/>
        <main className={classes.content}>
          
            <div className={classes.toolbar} />
            
                <Typography variant="h6" gutterBottom>
                    Relatório de Pedidos
                </Typography>
                <Paper className = {classes.content} >
                  <Grid container spacing={3}>
                      <Grid item xs={13} sm={3}>
                      
                          <form className={classes.container} noValidate>
                          
                            <TextField

                            required
                              id="nome_cliente"
                              name="nome"
                              label="Nome do Cliente"
                              fullWidth
                              autoComplete="nome"

                              defaultValue=""
                              className={classes.textField}
                              
                              value={nome_cliente}
                              onChange={e => setNome_cliente(e.target.value)}
                            />
                          </form>
                      
                      </Grid>
                      <Grid item xs={13} sm={2}>
                          <FormControl className={classes.formControl}>
                            <InputLabel required id="status">Status Pagamento</InputLabel>
                            <Select
                            
                              labelId="status"
                              id="status"
                              value={status}
                              onChange={e => setStatus(e.target.value)}
                            >
                              <MenuItem value="Pago">Pago</MenuItem>
                              <MenuItem value="Não Pago">Não Pago</MenuItem>
                              <MenuItem value="Todos">Todos os Tipos</MenuItem>
                            
                            </Select>
                          </FormControl>
                      </Grid>
                      <Grid item xs={13} sm={3}>
                    
                    <form className={classes.container} noValidate>
                      <TextField
                      
                        id="dateInicial"
                        label="Data Inicial"
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
                    <Grid item xs={13} sm={3}>
                    
                    <form className={classes.container} noValidate>
                      <TextField
                      
                        id="dateFinal"
                        label="Data Final"
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
                  
                  
                  <Grid item xs={12} sm={4}>
                    <br/>
                    <Button
                              
                              variant="contained"
                              color="primary"
                              style={{backgroundColor: "#00A869"}}
                              onClick ={ ()=>{Cadastrar(false)}}
                            >
                              Consultar Relatório 
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <br/>
                    <Button
                              
                              variant="contained"
                              color="primary"
                              style={{backgroundColor: "#ff0000"}}
                              onClick ={()=> {Cadastrar(true)}
                            }
                            >
                              Gerar PDF 
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
                <br/>
              <Paper className = {classes.content} >
                <TableContainer component={Paper}>
                      <Table className={classes.table} size="small" aria-label="a dense table">
                          <TableHead>
                          <TableRow>
                              <TableCell>ID Pedido</TableCell>
                              <TableCell align="center">Produto Final</TableCell>
                              <TableCell align="center">Cliente</TableCell>
                              <TableCell align="center">Status</TableCell>
                              <TableCell align="center">Descricão</TableCell>
                              <TableCell align="center">Quantidade&nbsp;</TableCell>
                              <TableCell align="center">Data&nbsp;</TableCell>
                              <TableCell align="center">Valor do Produto Vendido&nbsp;</TableCell>
                              <TableCell align="center">Valor Final do Pedido&nbsp;</TableCell>
                          </TableRow>
                          </TableHead>
                          <TableBody id = "tab">
                              {pedidos.map((row) => (
                                  <TableRow key={row.id_pedido}>
                                  <TableCell component="th" scope="row">
                                      {row.id_pedido}
                                  </TableCell>
                                  <TableCell align="center">{row.nome_produto_final}</TableCell>
                                  <TableCell align="center">{row.nome_cliente}</TableCell>

                                  <TableCell align="center">{row.status ==='Pago'?<Chip label="Pago" color="primary"/>:(row.status ==='Não Pago'?<Chip label="Não Pago" color="secondary" />:'')}</TableCell>
                                  <TableCell align="center">{row.descricao}</TableCell>
                                  <TableCell align="center">{row.quantidade}</TableCell>
                                  <TableCell align="center">{row.data.substring(0,10)}</TableCell>
                                  <TableCell align="center">{row.valor_produto_vendido} R$</TableCell>

                                  <TableCell align="center">{row.valor} R$</TableCell>
                                 

                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer>


                </Paper>

        </main>
      </div>
          
    );
  
}
