/* eslint-disable import/no-absolute-path */
import React from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import logo from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/logos/listening-music.png'
import { Link } from 'react-router-dom'

function LoginForm () {
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })

  const [codeExpired, setCodeExpired] = React.useState(true)

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
  const handleSubmit = (Event) => {
    Event.preventDefault()

    if (queryParams) {
      const accessCode = queryParams.match('=(.*)')[1]

      axios({
        method: 'POST',
        url: 'http://localhost:5000/authorize/passport',
        withCredentials: true,
        data: { ...formData, accessCode }
      }).then((res) => {
        console.log(res)
      }).catch(error => console.log(error))
    } else {
      axios({
        method: 'POST',
        url: 'http://localhost:5000/authorize/passport',
        withCredentials: true,
        data: formData
      }).then((res) => {
        console.log(res)
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
        <form
          className='authForm'
          onSubmit={handleSubmit}
        >
          <div className='authHeader'><img className='logoAuth' src={logo}/>Repertoire</div>
          <div className='signUpContainer'>Sign In</div>
          <input
          className='authInput'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
          >
          </input>
          <input
          className='authInput'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}
          >
          </input>
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
