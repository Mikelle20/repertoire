/* eslint-disable no-unused-vars */
/* eslint-disable import/no-absolute-path */
/* eslint-disable react/prop-types */
import React from 'react'
import { motion } from 'framer-motion'
import privatePng from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/lock.png'
import publicPng from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/public.png'
import defaultCover from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/defaults/defaultCover.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setError } from '../../features/playlistSlice'
import { useDispatch, useSelector } from 'react-redux'
function Playlist (props) {
  const navigate = useNavigate()
  const accessToken = window.sessionStorage?.getItem('accessToken')
  const headers = {
    Authorization: `Bearer ${accessToken}`
  }

  const dispatch = useDispatch()
  const handleClick = (e) => {
    e.preventDefault()
    navigate(`/playlist/${props.playlist.id}`)
  }
  const handleDelete = async (id) => {
    axios({
      method: 'DELETE',
      url: '/playlist/deletePlaylist',
      headers,
      data: {
        playlistId: props.playlist.id
      }
    }).catch(res => {
      dispatch(setError(true))
    })
    props.removePlaylist(id)
  }
  return (
    <motion.div
    whileHover={{ scale: 1.1 }}
    className='playlistCard'>
        <>
          <img src={props.playlist.images.length !== 0 ? props.playlist.images[0].url : defaultCover} className='cardImg'></img>
        </>
        <div className='cardTitle'>{props.playlist.title.length >= 15 ? `${props.playlist.title.split(' ').slice(0, 2).join(' ')}...` : props.playlist.title}
         {props.playlist.isPrivate ? <img src={privatePng} className='cardPng'></img> : <img src={publicPng} className='cardPng'></img>}</div>
         <div className='cardButtonContainer'>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            className='cardBtn'>
              Manage
            </motion.button>
            <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleDelete(props.playlist.id)}
            className='cardDeleteBtn'>
              Delete
            </motion.button>
         </div>
    </motion.div>
  )
}

export default Playlist
