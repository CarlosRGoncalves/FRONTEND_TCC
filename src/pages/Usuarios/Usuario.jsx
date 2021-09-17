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
import Typography from '@material-ui/core/Typography';
import './usuario.css';
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

}));

{
  const token = localStorage.getItem("token")
  if(token){
    const decoded = jwt_decode(token);
    localStorage.setItem("nome",decoded.nome);
  }
 
}

export default function MiniDrawer (){
  
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
  /* function createData(name, calories, fat, carbs, protein) {
      return { name, calories, fat, carbs, protein };
  }
  const rows = [
      createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
      createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
      createData('Eclair', 262, 16.0, 24, 6.0),
      createData('Cupcake', 305, 3.7, 67, 4.3),
      createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];*/
async function Delete(id){
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    if(window.confirm("Você tem certeza que vai excluir esse Usuário?")){
      var result = await axios.delete('http://localhost:3006/usuario/'+id,{ headers })
      //alert(result.status)
      // alert(id)
      if(result.status ===202){
        window.location.replace("http://localhost:3000/usuario");
      }else{
        alert('Ocorreu um erro, Tente novamente!')
        window.location.replace("http://localhost:3000/usuario");
      }
    }

    /*

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    const data = {
        nome: "teste",
        email: "xxsd@gmail.com",
        telefone: "14988216031",
        tipo_usuario: 2,
        senha: "1234"
    };
    console.log(data)
    if(window.confirm("Você tem certeza que vai excluir esse Usuário?")){
      var result = await axios.post('http://localhost:3006/usuario/cadastro',data)
      //alert(result.status)
      // alert(id)
      if(result.status ===202){
        window.location.replace("http://localhost:3000/usuario");
      }else{
        alert('Ocorreu um erro, Tente novamente!')
        window.location.replace("http://localhost:3000/usuario");
      }
    }
    */
    }

      function cad() {
        window.location.replace("http://localhost:3000/usuario/cadastro");
      }
      return (       
        <div className={classes.root}>
          <CssBaseline/>
          <MenuI/>
          <main className={classes.content}>
              <div className={classes.toolbar} />
              
              <h2>Usuários</h2>
                  <Grid container spacing={20}>
                  <Paper className = {classes.content} >
                  
                        <TableContainer component={Paper}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell align="center">Nome</TableCell>
                                    <TableCell align="center">Email</TableCell>
                                    <TableCell align="center">Telefone&nbsp;</TableCell>
                                    <TableCell align="center">Tipo Usuário&nbsp;</TableCell>
                                    <TableCell align="center">Opções&nbsp;</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {usuarios.map((row) => (
                                        <TableRow key={row.id_usuario}>
                                        <TableCell component="th" scope="row">
                                            {row.id_usuario}
                                        </TableCell>
                                        <TableCell align="center">{row.nome}</TableCell>
                                        <TableCell align="center">{row.email}</TableCell>
                                        <TableCell align="center">{row.telefone}</TableCell>
                                        <TableCell align="center">{row.tipo_usuario ===1?<Chip label="Administrador" color="primary"/>:<Chip label="Produtor" color="secondary" />}</TableCell>
                                        <TableCell align="right">
                                          <ButtonGroup  aria-label="outlined primary button group">
                                              <Button color = "primary" align="center" startIcon={<CreateIcon/>} href={'/usuario/alterar/'+row.id_usuario}></Button>
                                              <Button color = "secondary" align="center" startIcon={<DeleteIcon/>} onClick = {() => Delete(row.id_usuario)}></Button>
                                          </ButtonGroup>
                                        </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br/>
                        <div >
                              <Button
                              
                                    variant="contained"
                                    color="primary"
                                    style={{backgroundColor: "#00A869"}}
                                    onClick = {() => cad()}
                                  >
                                    Cadastrar Novo Usuário
                              </Button>
                        </div>
                    </Paper>
                    
                  </Grid>
                  
          </main>
        </div>
            
      );
  
}
