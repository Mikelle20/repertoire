/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router'
import RegisterForm from '../components/LoginRegister/RegisterForm'

function Register () {
  const accessToken = window.sessionStorage.getItem('accessToken') || null
  const navigate = useNavigate()
  if (accessToken) navigate('/home')
  return (
    <div className='landingContainer'>
      <div className='pageContainer'>
      <RegisterForm/>
      </div>
    </div>
  )
}

export default Register
