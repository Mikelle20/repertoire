/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { setError } from '../../features/errorSlice'

function ResetForm () {
  const [formData, setFormData] = React.useState({
    password: '',
    confirmPassword: '',
    match: false
  })

  const [toggle, setToggle] = React.useState(false)

  const token = window.location.search
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
    axios.post('/authorize/resetLink', { email: formData.password }).then(() => {

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
            {toggle && <div style={{ marginTop: '10px' }} className='error'>An email was sent to the entered account.</div>}
            {(formData.match && formData.confirmPassword.length !== 0) && <motion.button className='btn' whileTap={{ scale: 0.9 }}>Send Email</motion.button>}
        </form>
    </motion.div>
  )
}

export default ResetForm
