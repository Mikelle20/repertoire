/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'

function Playlist () {
  const location = useLocation()
  const user = JSON.parse(window.localStorage.getItem('user'))
  return (
    <div className='pageContainer'>
        <div className='container'>
            playlist
            <div className='playContainer'>

            </div>
        </div>
    </div>
  )
}

export default Playlist
