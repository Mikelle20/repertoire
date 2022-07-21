/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function RegisterForm () {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    passwordsMatch: true
  })

  const [error, setError] = React.useState({
    isError: false,
    errorText: ''
  })

  const [togglePassword, setTogglePassword] = React.useState(false)

  const handleChange = (Event) => {
    setFormData(prevState => {
      return {
        ...prevState,
        [Event.target.name]: Event.target.value
      }
    })
    console.log(formData)
  }

  React.useEffect(() => {
    if (formData.password === formData.confirmPassword) {
      setFormData((prevState) => {
        return {
          ...prevState,
          passwordsMatch: true
        }
      })
    } else {
      setFormData((prevState) => {
        return {
          ...prevState,
          passwordsMatch: false
        }
      })
    }
  }, [formData])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await (await axios.post('/authorize/register/', formData, { withCredentials: true })).data

    if (res.success === false) {
      setError({
        isError: true,
        errorText: res.error
      })
    } else {
      const scopes = 'user-top-read user-read-recently-played user-read-currently-playing playlist-modify-public user-library-modify playlist-modify-private playlist-read-collaborative playlist-read-private'
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
  }
  return (
    <>
      <div className='authContainer'>
        <form
        className='authForm'
        onSubmit={handleSubmit}
        >
          <div className='authHeader'><img className='logoAuth' src={require('../../assets/logos/listening-music.png')}/>Repertoire</div>
          <div className='signUpContainer'>Sign Up</div>
          <div className='inputContainer'>
            <span>
                <img src={require('../../assets/icons/email.png')} className='inputIcon'></img>
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
              <img src={require('../../assets/icons/password.png')} className='inputIcon'></img>
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
              <img src={togglePassword ? require('../../assets/icons/lock_open.png') : require('../../assets/icons/lock_closed.png') } className='inputIcon'></img>
            </span>
          </div>
          <div className='inputContainer'>
            <span>
              <img src={require('../../assets/icons/password.png')} className='inputIcon'></img>
            </span>
            <input
            className='authInput'
            name='confirmPassword'
            placeholder='Confirm Password'
            type={togglePassword ? '' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            >
            </input>
          </div>
          {error.isError && <div className='errorMessage'> {error.errorText} </div>}
          {formData.passwordsMatch ? <motion.button className='btn' whileTap={{ scale: 0.9 }}>Register</motion.button> : <div className='errorMessage'>Passwords do not match.</div> }
          <div className='authFooter'>
            <Link
            className='authLink'
            to={''}>
              Reset Password
            </Link>
            <Link
            className='authLink'
              to={'/login'}>
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </>

  )
}

export default RegisterForm
