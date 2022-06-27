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
    <div className='landingContainer'>
      <div className='pageContainer'>
      <LoginForm/>
      </div>
    </div>
  )
}

export default Login
