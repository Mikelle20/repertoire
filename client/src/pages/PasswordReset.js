import React from 'react'
import { useSelector } from 'react-redux'
import ResetEmailForm from '../components/Reset/ResetEmailForm'

function PasswordReset () {
  const { error } = useSelector(store => store.error)
  return (
    <div className='landingContainer'>
        <div className='pageContainer'>
            {error.isError ? <div className='loadingScreen'>{error.error}</div> : <ResetEmailForm/>}
        </div>
    </div>
  )
}

export default PasswordReset
