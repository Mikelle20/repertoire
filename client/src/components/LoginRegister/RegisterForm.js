/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-absolute-path */
/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import logo from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/logos/listening-music.png'
import { Link } from 'react-router-dom'

import locked from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/lock_closed.png'
import unlocked from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/lock_open.png'
import passwordIcon from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/password.png'
import emailIcon from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/email.png'

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

  const handleSubmit = (Event) => {
    Event.preventDefault()

    axios({
      method: 'post',
      url: '/authorize/register/',
      withCredentials: true,
      data: {
        email: formData.email,
        password: formData.password
      },
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*'
      }

    }).then((res) => {
      const { userCreated, errorText } = res.data
      console.log(userCreated)
      if (!userCreated) {
        setError({
          isError: true,
          errorText
        })
      } else {
        const scopes = 'user-read-currently-playing playlist-modify-public user-library-modify playlist-modify-private playlist-read-collaborative playlist-read-private'
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
    })
  }
  return (
    <>
      <div className='authContainer'>
       <form
       className='authForm'
       onSubmit={handleSubmit}
      >
      <div className='authHeader'><img className='logoAuth' src={logo}/>Repertoire</div>
      <div className='signUpContainer'>Sign Up</div>
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
          <div className='inputContainer'>
            <span>
              <img src={passwordIcon} className='inputIcon'></img>
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
            {/* <span onClick={() => {
              setTogglePassword(!togglePassword)
            }}>
              <img src={togglePassword ? unlocked : locked} className='inputIcon'></img>
            </span> */}
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
