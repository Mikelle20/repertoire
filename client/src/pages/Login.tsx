import React from 'react';
import LoginForm from '../components/LoginRegister/LoginForm';

function Login(): JSX.Element {
  interface TokenInterface {
    token: string
    exp: number
  }
  const stringifiedToken: null | string = window.sessionStorage.getItem('accessToken') || null;
  const accessToken: TokenInterface = JSON.parse(stringifiedToken);
  if (accessToken) window.location.href = '/home';
  return (
    <div className="landingContainer">
      <div className="pageContainer">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
