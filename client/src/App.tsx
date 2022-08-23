/* eslint-disable import/extensions */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
import './App.css';
import { Route, Routes } from 'react-router';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Suggestion from './pages/Suggestion';
import Playlists from './pages/Playlists';
import Playlist from './pages/Playlist';
import Friends from './pages/Friends';
import Navbar from './components/Navbar';
import { axiosAuth } from './utils';
import PasswordReset from './pages/PasswordReset';
import ResetPassword from './pages/ResetPassword';
import About from './pages/About';

function App() {
  interface TokenInterface {
    token: string
    exp: number
  }

  const stringifiedToken: string | null = window.sessionStorage.getItem('accessToken');
  const accessToken: TokenInterface = JSON.parse(stringifiedToken);
  axios.interceptors.request.use(async (config) => {
    if (accessToken) {
      const { exp } = JSON.parse(window.sessionStorage.getItem('accessToken'));
      const expiry = new Date(exp * 1000).toUTCString();
      const currentTime = new Date().toUTCString();
      const headers = {
        Authorization: `Bearer ${accessToken.token}`,
      };
      if (expiry < currentTime) {
        const res: TokenInterface = await (await axiosAuth.get('/checkToken', { withCredentials: true, headers })).data.accessToken;
        res && window.sessionStorage.setItem('accessToken', JSON.stringify(res));
      }
    }
    return config;
  }, (error) => Promise.reject(error));
  return (

    <>
      <div className="landingContainer">
        <div className="landingTop" />
        <div className="landingBottom" />
        <div className="pageContainer">
          {window.location.pathname !== '/' && <Navbar />}
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/suggestion" element={<Suggestion />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlist/:id" element={<Playlist />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/reset" element={<PasswordReset />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>

  );
}

export default App;
