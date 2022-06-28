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

function App () {
  const dispatch = useDispatch()
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })

  const handleChange = (Event) => {
    setFormData(prevState => {
      return {
        ...prevState,
        [Event.target.name]: Event.target.value
      }
    })
  }

  const handleSubmit = (Event) => {
    Event.preventDefault()
    // console.log(formData)

    axios({
      method: 'post',
      url: '/authorize/passport/',
      data: formData,
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*'
      }

    }).then((res) => {
      if (res) {
        dispatch(setUser(res.data.user))
        const scopes = 'user-read-currently-playing playlist-modify-public user-library-modify playlist-modify-private playlist-read-collaborative playlist-read-private'
        const authorizeEndpoint = 'https://accounts.spotify.com/authorize?'

        const authObject = {
          response_type: 'code',
          client_id: '87b59a7fa8cf4a0b85c227afc162a118',
          scope: scopes,
          redirect_uri: 'http://localhost:3000/settingup',
          show_dialog: true
        }
        const authQueryString = new URLSearchParams(authObject).toString()
        window.location.href = authorizeEndpoint + authQueryString
      }
    })
  }
  return (

  <>
      <div className='landingContainer'>
        <div className='landingTop'></div>
        <div className='landingBottom'></div>
      </div>
      <Routes>
        <Route path='/landing' element={<Landing />} />
        <Route path='/settingup' element={<SettingUp />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/suggestion' element={<Suggestion />} />
      </Routes>
      {/* <form onSubmit={handleSubmit}>
          <input
            placeholder='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          >
          </input>

          <input
            placeholder='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          >
          </input>
          <button>Submit!</button>
        </form> */}
    </>

  )
}

export default App
