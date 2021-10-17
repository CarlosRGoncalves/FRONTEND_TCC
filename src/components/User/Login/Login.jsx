import React,{Component} from 'react';

import './Login.css';
//import { Alert } from 'react-bootstrap';
import axios from 'axios';
import { Input } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Button';


import Alert from '@material-ui/lab/Alert';

class Login extends Component{
  constructor(props){
    super(props)
   
    this.state={
      message : '',
    }
  }


  signIn = (Event) =>{
    const data = {email: this.email, senha: this.senha};
    if(data.email == null && data.senha == null){
        alert("Email e Senha sem preencher!!!")
        
    }else if(data.email == null){
        alert("Email sem preencher!!!")
    }else if(data.senha == null){
        alert("Senha sem preencher!!!")
    }else{
        axios.post(process.env.REACT_APP_API_URL + 'usuario/login', data)
        .then(response => {

            if(response.status == 200){
              const token = response.data.token;
            
              localStorage.setItem('token', token);
              window.location.replace(process.env.REACT_APP_FRONT_URL + "pagina_inicial");

             // this.props.history.push("/home");
            }else{
              //alert()
              this.setState(response.data.mensagem)
              throw new Error("Login Inválido...");
            }
        })
        .catch(e => {
          console.log(e);
          this.setState({message: e.message})
    });
  }
    Event.preventDefault();
  }
  render() {
    return (
      <div className="borda">
        <div className="user-login">
        <Typography variant="h1" center>
        SISTEMA DE CONTROLE DE PRODUÇÃO DE ORGÂNICOS        </Typography>
      
          {
            this.state.message !==''?(
              <Alert severity="error">Login Incorreto!</Alert>
              //alert('Falha de Autenticação!!!')
            ) : ''
          }

          <form>
            <div className="user-login__form-control">
              <InputLabel htmlFor="email">E-mail</InputLabel>
              <Input id="email" type="text" name="email" autoComplete="off"  required onChange={e => this.email = e.target.value}/>
            </div>
            <div className="user-login__form-control">
              <InputLabel htmlFor="password">Senha</InputLabel>
              <Input id="senha" type="password" name="senha"  onChange={e => this.senha = e.target.value} required/>
              <hr></hr>
            </div>
           
            <Button
              variant="contained"
              color="primary"
              type="submit"
              theme="contained-green"
              className="user-login__submit-button"
              rounded
              onClick = {this.signIn}
            >
              Entrar
            </Button>
            
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
