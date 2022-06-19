/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'
import LoginForm from '../components/LoginRegister/LoginForm'

function Login () {
  const [isExpired, setIsExpired] = React.useState(false)

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setIsExpired(true)
  //   }, 10000)
  // }, [])

  const closeError = () => {
    setIsExpired(false)
  }
  return (
  <div className={isExpired ? 'pageContainer pageContainerBlur' : 'pageContainer'}>
      {isExpired && <motion.div
        drag
        dragSnapToOrigin
        id='modal'
        className='expiredContainer'>
          <motion.button
          onClick={closeError}
          whileTap={{ scale: 0.8 }}
          className='closeModalBtn'>
              X
          </motion.button>
          <p className='modalMessage'>Authorization code has expired. In order to continue, you must re-register.</p>
        </motion.div>}
    <div className='authContainer'>
    <LoginForm/>
    </div>
  </div>
  )
}

export default Login
