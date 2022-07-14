/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router'
import Landing from './pages/Landing'
import SettingUp from './pages/SettingUp'
import Home from './pages/Home'
import { useDispatch } from 'react-redux'
import { setUser } from './features/userSlice'
import Register from './pages/Register'
import Login from './pages/Login'
import Suggestion from './pages/Suggestion'
import Playlists from './pages/Playlists'
import Playlist from './pages/Playlist'
import Friends from './pages/Friends'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'

function App () {
  const navigate = useNavigate()
  const paths = {
    Home: '/home',
    Suggestions: '/suggestion',
    Friends: '/friends',
    Playlists: '/playlists'
  }
  return (

    <>
      <div className='landingContainer'>
        <div className='landingTop'></div>
        <div className='landingBottom'></div>
        <div className='pageContainer'>
          {window.location.pathname !== '/' && <Navbar/>}
        </div>
      </div>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/settingup' element={<SettingUp/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/suggestion' element={<Suggestion/>} />
        <Route path='/playlists' element={<Playlists/>} />
        <Route path='/playlist/:id' element={<Playlist/>} />
        <Route path='/friends' element={<Friends/>} />
      </Routes>
    </>

  )
}

export default App
