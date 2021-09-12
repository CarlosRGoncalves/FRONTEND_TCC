import { Component } from 'react';

export default class Logout extends Component {

    componentWillMount() {
        localStorage.removeItem('token');

        if(localStorage.getItem('nome')){
            localStorage.removeItem('nome');
        }
        this.props.history.push('/');
    }

    render() {
        return null;
    }
}