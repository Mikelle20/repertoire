import axios from 'axios'
import { motion } from 'framer-motion'
import React from 'react'
import { setError } from '../../features/errorSlice'

function ResetEmailForm () {
  const [formData, setFormData] = React.useState({
    email: ''
  })

  const [toggle, setToggle] = React.useState(false)

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
    axios.post('/authorize/resetLink', { email: formData.email }).then(() => {
      setToggle(true)
    }).catch(() => setError(true))
  }
  return (
    <motion.div drag dragSnapToOrigin className='authContainer'>
        <form onSubmit={handleSubmit} className='authForm'>
            <div className='authHeader'><img className='logoAuth' src={require('../../assets/logos/listening-music.png')}/>Repertoire</div>
            <div className='error'>Enter Your Email To Receive A Reset Link</div>
            <div className='inputContainer'>
                <input className='authInput'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                >
                </input>
            </div>
            {toggle && <div style={{ marginTop: '10px' }} className='error'>An email was sent to the entered account.</div>}
            {(toggle === false && formData.email.length !== 0) && <motion.button className='btn' whileTap={{ scale: 0.9 }}>Send Email</motion.button>}
        </form>
    </motion.div>
  )
}

export default ResetEmailForm
