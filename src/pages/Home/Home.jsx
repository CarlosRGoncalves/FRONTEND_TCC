import React, { Component } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class Home extends Component {
  constructor() {
    super();
    this.state = {
        user: {},
    }
}

/*componentDidMount() {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/usuario/secao',{ headers: new Headers({ 'Authorization': `Bearer ${token}` })})
    .then(response => {
        if(response.status == 200) {
          
          //  this.setState({ user })
            //return response.json();
        }else{
        throw new Error("Oops! Ocorreu um erro. :(");}

    })
    .catch(e => console.log(e));
}*/
  render () { 
      return (
        <div>
       
        <hr className="my-3" />
        <p>
            <code> {this.state.user.nome}, {this.state.user.email} logado com sucesso! ^-^  </code>
        </p>
        <div className="text-center">
            <Link to="/logout" className="btn btn-outline-primary"> Log Out </Link>
        </div>
    </div>
);
  }
}
