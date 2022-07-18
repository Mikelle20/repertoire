/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import './App.css'
import { Route, Routes } from 'react-router'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Suggestion from './pages/Suggestion'
import Playlists from './pages/Playlists'
import Playlist from './pages/Playlist'
import Friends from './pages/Friends'
import Navbar from './components/Navbar'
import { axiosAuth } from './utils'

function App () {
  const accessToken = window.sessionStorage.getItem('accessToken')
  const headers = {
    Authorization: `Bearer ${accessToken}`
  }
  axios.interceptors.request.use(async (config) => {
    if (accessToken) {
      const res = await (await axiosAuth.get('/checkToken', { withCredentials: true, headers })).data
      console.log('ran interceptor')
      window.sessionStorage.setItem('accessToken', res.accessToken)
    }
    return config
  }, (error) => {
    return Promise.reject(error)
  })
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
