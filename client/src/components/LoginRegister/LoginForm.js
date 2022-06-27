/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-absolute-path */
import React from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import logo from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/logos/listening-music.png'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../features/userSlice'
import locked from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/lock_closed.png'
import unlocked from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/lock_open.png'
import passwordIcon from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/password.png'
import emailIcon from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/email.png'
function LoginForm () {
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })

  const dispatch = useDispatch()

  const [redirect, setRedirect] = React.useState(false)

  const [togglePassword, setTogglePassword] = React.useState(false)

  const [error, setError] = React.useState({
    isError: false,
    errorText: 'Incorrect username or password.'
  })

  const queryParams = window.location.search || null
  const handleChange = (Event) => {
    setFormData(prevState => {
      return {
        ...prevState,
        [Event.target.name]: Event.target.value
      }
    })
  }

  let user
  const handleSubmit = (Event) => {
    Event.preventDefault()

    if (queryParams) {
      const accessCode = queryParams.match('=(.*)')[1]

      axios({
        method: 'POST',
        url: 'http://localhost:5000/authorize/passport',
        withCredentials: true,
        data: { ...formData, accessCode }
      }).then(async (res) => {
        user = res.data
        setError(prevState => {
          return {
            ...prevState,
            isError: false
          }
        })

        axios({
          method: 'POST',
          url: 'http://localhost:5000/authorize/accountConnected',
          data: { email: formData.email }
        }).then(async () => {
          await dispatch(setUser(user))
          setRedirect(true)
        })
      }).catch(
        setError((prevState) => {
          return {
            ...prevState,
            isError: true
          }
        })
      )
    } else {
      axios({
        method: 'POST',
        url: 'http://localhost:5000/authorize/passport',
        withCredentials: true,
        data: formData
      }).then((res) => {
        const { spotify_connected } = res.data
        user = res.data
        setError(prevState => {
          return {
            ...prevState,
            isError: false
          }
        })

        if (spotify_connected) {
          dispatch(setUser(user))
          window.localStorage.setItem('user', JSON.stringify(user))
          setRedirect(true)
        } else {
          const scopes = 'user-top-read playlist-modify-public user-library-modify playlist-modify-private playlist-read-collaborative playlist-read-private'
          const authorizeEndpoint = 'https://accounts.spotify.com/authorize?'

          const authObject = {
            response_type: 'code',
            client_id: process.env.REACT_APP_CLIENT_ID,
            scope: scopes,
            redirect_uri: process.env.REACT_APP_REDIRECT_URI,
            show_dialog: true
          }
          const authQueryString = new URLSearchParams(authObject).toString()
          window.location.href = authorizeEndpoint + authQueryString
        }
      }).catch(
        setError((prevState) => {
          return {
            ...prevState,
            isError: true
          }
        })
      )
    }
  }
  return (
    <>
      <div className='authContainer '>
        {redirect && <Navigate to='/home'/>}
        <form
          className='authForm'
          onSubmit={handleSubmit}
        >
          <div className='authHeader'><img className='logoAuth' src={logo}/>Repertoire</div>
          <div className='signUpContainer'>Sign In</div>
          <div className='inputContainer'>
           <span>
              <img src={emailIcon} className='inputIcon'></img>
            </span>
            <input
            className='authInput'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            >
            </input>
          </div>
          <div className='inputContainer'>
            <span>
              <img src={passwordIcon} className='inputIcon'></img>
            </span>
            <input
            className='authInput'
            name='password'
            placeholder='Password'
            type={togglePassword ? '' : 'password'}
            value={formData.password}
            onChange={handleChange}
            >
            </input>
            <span onClick={() => {
              setTogglePassword(!togglePassword)
            }}>
              <img src={togglePassword ? unlocked : locked} className='inputIcon'></img>
            </span>
          </div>
          {error.isError && <div className='errorMessage'>{error.errorText}</div>}
          <motion.button className='btn' whileTap={{ scale: 0.9 }}>Sign In</motion.button>
          <div className='authFooter'>
            <Link
            className='authLink'
            to={''}>
              Reset Password
            </Link>
            <Link
            className='authLink'
            to={'/register'}>
              Register
            </Link>
          </div>
        </form>
      </div>
  </>
  )
}

export default LoginForm
