/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import './App.css'
import { Route, Routes } from 'react-router'
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

function App () {
  return (

    <>
      <div className='landingContainer'>
        <div className='landingTop'></div>
        <div className='landingBottom'></div>
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
