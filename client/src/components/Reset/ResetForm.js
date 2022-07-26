/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { setError } from '../../features/errorSlice'

function ResetForm () {
  const queryParams = window.location.search || null
  if (queryParams === null) window.location.href = '/login'
  const [formData, setFormData] = React.useState({
    password: '',
    confirmPassword: '',
    match: false
  })

  const [toggle, setToggle] = React.useState(false)
  const [error, setError] = React.useState({
    isError: false,
    msg: ''
  })

  const token = queryParams.match('=(.*)')[1]
  console.log(token)
  React.useEffect(() => {
    if (formData.password === formData.confirmPassword) {
      setFormData((prevState) => {
        return {
          ...prevState,
          match: true
        }
      })
    } else {
      setFormData((prevState) => {
        return {
          ...prevState,
          match: false
        }
      })
    }
  }, [formData.confirmPassword])

  const handleChange = (Event) => {
    setFormData(prevState => {
      return {
        ...prevState,
        [Event.target.name]: Event.target.value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/authorize/resetPassword', { password: formData.password, token }).then((res) => {
      if (!res.data.success) setError({ isError: true, error: res.data.error })
      setToggle(true)
      setFormData(prev => {
        return { ...prev, match: false }
      })
    }).catch(() => setError(true))
  }
  return (
    <motion.div drag dragSnapToOrigin className='authContainer'>
        <form onSubmit={handleSubmit} className='authForm'>
            <div className='authHeader'><img className='logoAuth' src={require('../../assets/logos/listening-music.png')}/>Repertoire</div>
            <div className='error'>Enter Your Email To Receive A Reset Link</div>
            <div className='inputContainer'>
                <input className='authInput'
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                >
                </input>
            </div>
            <div className='inputContainer'>
                <input className='authInput'
                name='confirmPassword'
                placeholder='Confirm Password'
                value={formData.confirmPassword}
                onChange={handleChange}
                >
                </input>
            </div>
            {toggle && <div style={{ marginTop: '10px' }} className='error'>{error.isError ? error.msg : 'Your password has been changed. Please login.'}</div>}
            {(formData.match && formData.confirmPassword.length !== 0) && <motion.button className='btn' whileTap={{ scale: 0.9 }}>Submit</motion.button>}
        </form>
    </motion.div>
  )
}

export default ResetForm
