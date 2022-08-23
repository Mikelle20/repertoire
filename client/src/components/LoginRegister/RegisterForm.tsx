/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { SyntheticEvent } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function RegisterForm(): JSX.Element {
  interface FormInterface {
    email: string
    password: string
    confirmPassword: string
    passwordsMatch: boolean
  }
  const [formData, setFormData] = React.useState<FormInterface>({
    email: '',
    password: '',
    confirmPassword: '',
    passwordsMatch: false,
  });

  const [error, setError] = React.useState<{isError: boolean, errorText: string}>({
    isError: false,
    errorText: '',
  });

  const [togglePassword, setTogglePassword] = React.useState<boolean>(false);

  const handleChange = (Event: SyntheticEvent) => {
    const target = Event.target as HTMLInputElement;
    setFormData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  React.useEffect((): void => {
    if (formData.password === formData.confirmPassword) {
      setFormData((prevState) => ({
        ...prevState,
        passwordsMatch: true,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        passwordsMatch: false,
      }));
    }
  }, [formData]);

  const handleSubmit = async (Event: React.FormEvent) => {
    Event.preventDefault();
    const res = await (await axios.post('/authorize/register/', formData, { withCredentials: true })).data;

    if (res.success === false) {
      setError({
        isError: true,
        errorText: res.error,
      });
    } else {
      const scopes = 'user-top-read user-read-recently-played user-read-currently-playing playlist-modify-public user-library-modify playlist-modify-private playlist-read-collaborative playlist-read-private';
      const authorizeEndpoint = 'https://accounts.spotify.com/authorize?';

      const authObject = {
        response_type: 'code',
        client_id: process.env.REACT_APP_CLIENT_ID,
        scope: scopes,
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        show_dialog: true,
      };
      const authQueryString = new URLSearchParams(authObject.toString());
      window.location.href = authorizeEndpoint + authQueryString;
    }
  };
  return (
    <div className="authContainer">
      <form
        className="authForm"
        onSubmit={handleSubmit}
      >
        <div className="authHeader">
          <img alt="logo" className="logoAuth" src={require('../../assets/logos/listening-music.png')} />
          Repertoire
        </div>
        <div className="signUpContainer">Sign Up</div>
        <div className="inputContainer">
          <span>
            <img alt="email" src={require('../../assets/icons/email.png')} className="inputIcon" />
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
            <img alt="lock" src={togglePassword ? require('../../assets/icons/lock_open.png') : require('../../assets/icons/lock_closed.png')} className="inputIcon" />
          </span>
        </div>
        <div className="inputContainer">
          <span>
            <img alt="lock" src={require('../../assets/icons/password.png')} className="inputIcon" />
          </span>
          <input
            className="authInput"
            name="confirmPassword"
            placeholder="Confirm Password"
            type={togglePassword ? '' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {error.isError && (
        <div className="errorMessage">
          {' '}
          {error.errorText}
          {' '}
        </div>
        )}
        {formData.passwordsMatch ? <motion.button className="btn" whileTap={{ scale: 0.9 }}>Register</motion.button> : <div className="errorMessage">Passwords do not match.</div> }
        <div className="authFooter">
          <Link
            className="authLink"
            to="/reset"
          >
            Reset Password
          </Link>
          <Link
            className="authLink"
            to="/login"
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>

  );
}

export default RegisterForm;
