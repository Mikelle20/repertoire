/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'
import LoginForm from '../components/LoginRegister/LoginForm'

function Login () {
  const accessToken = window.sessionStorage.getItem('accessToken') || null
  if (accessToken) window.location.href = '/home'
  return (
    <div className='landingContainer'>
      <div className='pageContainer'>
      <LoginForm/>
      </div>
    </div>
  )
}

export default Login
