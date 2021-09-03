import React from 'react';
import UIButton from 'components/UI/Button/Button';

import './Login.css';

const UserLogin = () => {
  return (
    <div className="borda">
      <div className="user-login">
        <h1 className="user-login__title">Sistema de Orgânicos</h1>
        <form autoComplete="nope">
          <div className="user-login__form-control">
            <label htmlFor="email">E-mail</label>
            <input id="email" type="text" name="email" autoComplete="off" />
          </div>
          <div className="user-login__form-control">
            <label htmlFor="password">Senha</label>
            <input id="password" type="password" name="password" />
          </div>
          <UIButton
            type="submit"
            theme="contained-green"
            className="user-login__submit-button"
            rounded
          >
            Entrar
          </UIButton>
          
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
