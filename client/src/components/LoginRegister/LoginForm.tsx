/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { SyntheticEvent } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormData] = React.useState<{email: string, password: string, rememberMe: boolean}>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [togglePassword, setTogglePassword] = React.useState(false);

  const [error, setError] = React.useState({
    isError: false,
    errorText: 'Incorrect username or password.',
  });

  const queryParams = window.location.search || null;
  const handleChange = (Event: SyntheticEvent) => {
    setFormData((prevState) => {
      const {
        value, name, type, checked,
      } = Event.target as HTMLInputElement;
      return {
        ...prevState,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };

  const handleSubmit = async (Event: React.FormEvent) => {
    Event.preventDefault();
    if (queryParams) {
      const accessCode = queryParams.match('=(.*)')[1];
      const url = '/authorize/login';
      const res = await (await axios.post(url, { ...formData, accessCode }, {
        withCredentials: true,
      })).data;

      if (res.success === true) {
        const accountConnected = await (await axios.post(
          '/authorize/accountConnected',
          { email: formData.email },

          { withCredentials: true },
        )).data;

        if (accountConnected.success) {
          window.sessionStorage.setItem('accessToken', JSON.stringify(res.accessToken));
          // navigate('/home')
          window.location.href = '/home';
        }
      } else {
        setError({ isError: true, errorText: 'Incorrect email or password.' });
      }
    } else {
      const url = '/authorize/login';
      const res = await (await axios.post(url, { ...formData }, {
        withCredentials: true,
      })).data;

      if (res.success) {
        const { success } = await (await axios.post('/authorize/accountConnected', { check: true, email: formData.email }, { withCredentials: true })).data;

        if (success) {
          window.sessionStorage.setItem('accessToken', JSON.stringify(res.accessToken));
          // navigate('/home')
          window.location.href = '/home';
        } else {
          const scopes = 'user-top-read user-read-recently-played playlist-modify-public user-library-modify playlist-modify-private playlist-read-collaborative playlist-read-private';
          const authorizeEndpoint = 'https://accounts.spotify.com/authorize?';

          const authObject = {
            response_type: 'code',
            client_id: process.env.REACT_APP_CLIENT_ID,
            scope: scopes,
            redirect_uri: process.env.REACT_APP_REDIRECT_URI,
            show_dialog: 'true',
          };
          const authQueryString = new URLSearchParams(authObject).toString();
          window.location.href = authorizeEndpoint + authQueryString;
        }
      } else {
        setError({ isError: true, errorText: 'Incorrect email or password.' });
      }
    }
  };
  return (
    <div className="authContainer ">
      <form
        className="authForm"
        onSubmit={handleSubmit}
      >
        <div className="authHeader">
          <img alt="logo" className="logoAuth" src={require('../../assets/logos/listening-music.png')} />
          Repertoire
        </div>
        <div className="signUpContainer">Sign In</div>
        <div className="inputContainer">
          <span>
            <img alt="email icon" src={require('../../assets/icons/email.png')} className="inputIcon" />
          </span>
          <input
            className="authInput"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="inputContainer">
          <span>
            <img alt="password" src={require('../../assets/icons/password.png')} className="inputIcon" />
          </span>
          <input
            className="authInput"
            name="password"
            placeholder="Password"
            type={togglePassword ? '' : 'password'}
            value={formData.password}
            onChange={handleChange}
          />
          <span onClick={() => {
            setTogglePassword(!togglePassword);
          }}
          >
            <img alt="lock_open" src={togglePassword ? require('../../assets/icons/lock_open.png') : require('../../assets/icons/lock_closed.png')} className="inputIcon" />
          </span>
        </div>
        {error.isError && <div className="errorMessage">{error.errorText}</div>}
        <motion.button className="btn" whileTap={{ scale: 0.9 }}>Sign In</motion.button>
        <div className="authFooter">
          <Link
            className="authLink"
            to="/reset"
          >
            Reset Password
          </Link>
          <Link
            className="authLink"
            to="/register"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
