import React from 'react'
import FriendSearchBar from '../components/Friend/FriendSearchBar'

function Friends () {
  const accessToken = window.sessionStorage.getItem('accessToken') || null
  if (!accessToken) window.location.href = '/login'
  return (
    <div className='landingContainer'>
        <div className='pageContainer'>
            {accessToken && <FriendSearchBar/>}
        </div>
    </div>
  )
}

export default Friends
