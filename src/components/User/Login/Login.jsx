import React,{Component} from 'react';
import UIButton from 'components/UI/Button/Button';

import './Login.css';
import { Alert } from 'react-bootstrap';
import { useHistory, withRouter } from 'react-router';
import axios from 'axios';

class Login extends Component{
  constructor(props){
    super(props)
    //console.log(this.props);
    this.state={
      message : '',//this.props.location.state?this.props.location.state.message:'',
    }
  }


  signIn = (Event) =>{
    const data = {email: this.email, senha: this.senha};
        axios.post('http://localhost:3000/usuario/login', data)
        .then(response => {
            console.log(response);
            if(response.status == 200){
              const token = response.data.token;
             // alert(response.data.mensagem)
             // console.log(response.data.mensagem)
              localStorage.setItem('token', token);
              this.props.history.push("/home");
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
    Event.preventDefault();
  }
  render() {
    return (
      <div className="borda">
        <div className="user-login">
          <h1 className="user-login__title">Sistema de Orgânicos</h1>
          {
            this.state.message !==''?(
              alert('Falha de Autenticação!!!')
             // <Alert color = "danger">{this.state.message}</Alert>
            ) : ''
          }
          <form>
            <div className="user-login__form-control">
              <label htmlFor="email">E-mail</label>
              <input id="email" type="text" name="email" autoComplete="off" onChange={e => this.email = e.target.value} />
            </div>
            <div className="user-login__form-control">
              <label htmlFor="password">Senha</label>
              <input id="senha" type="password" name="senha" onChange={e => this.senha = e.target.value} />
            </div>
            <UIButton
              type="submit"
              theme="contained-green"
              className="user-login__submit-button"
              rounded
              onClick = {this.signIn}
            >
              Entrar
            </UIButton>
            
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
