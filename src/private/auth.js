import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
const isAuth = async () =>{
   /// console.log(localStorage.getItem('token'))
    if(localStorage.getItem('token') !== null){
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const response = await axios.get('http://localhost:3006/validaToken',{headers})
        if(response.status == 200) {
          return true;
        }else if(response.status == 401){
            console.log("Entrou aqui")
            alert("Usuario não Autorizado!!!");
            return false;
        }
    }
    console.log("Entrou aqui2")
    alert("Usuario não Autorizado!!!");
    return false;
};
export const PrivateRoute = (props) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { component: Component, ...rest } = props;

    useEffect(() => {
        isAuth().then((Authorization) =>{
            setIsAuthenticated(Authorization);
            setLoading(false);
            //console.log(Authorization);
        }).catch(()=>{
            setIsAuthenticated(false);
            setLoading(false);
        })
    }, []);
   // console.log(isAuthenticated)
   // console.log(loading)
    return (
        <Route
            {...rest}
            render={() =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : loading ? (
                    <div>LOADING...</div>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location },
                        }}
                    />
                )
            }
            />
        )
}
export default PrivateRoute;