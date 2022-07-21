/* eslint-disable react/prop-types */
import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import { Tooltip } from '@mui/material'

function PlaylistItem (props) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/playlist/${props.playlist.playlistId}`)
  }
  return (
    <Tooltip title={props.playlist.playlistName}>
      <motion.div
      onClick={handleClick}
      whileHover={{ scale: 1.2 }}
      className='sideItem'>
        <img className='topArtist' src={props.playlist.playlistImage.length === 0 ? require('../../assets/defaults/defaultCover.png') : props.playlist.playlistImage[0].url} alt={props.playlist.playlistName}></img>
        <img className='homeSuggestionImage' src={props.playlist.isPrivate ? require('../../assets/icons/lock.png') : require('../../assets/icons/public.png') } />
      </motion.div>
    </Tooltip>
  )
}

export default PlaylistItem
