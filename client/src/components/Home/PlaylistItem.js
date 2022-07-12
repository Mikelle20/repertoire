/* eslint-disable import/no-absolute-path */
/* eslint-disable react/prop-types */
import React from 'react'
import { motion } from 'framer-motion'
import publicPng from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/public.png'
import privatePng from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/lock.png'
import defaultCover from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/defaults/defaultCover.png'
import { useNavigate } from 'react-router'

function PlaylistItem (props) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/playlist/${props.playlist.playlistId}`)
  }
  return (
    <motion.div
    onClick={handleClick}
    title={props.playlist.playlistName}
    whileHover={{ scale: 1.2 }}
    className='sideItem'>
      <img className='topArtist' src={props.playlist.playlistImage.length === 0 ? defaultCover : props.playlist.playlistImage[0].url} alt={props.playlist.playlistName}></img>
      <img className='homeSuggestionImage' src={props.playlist.isPrivate ? privatePng : publicPng } />
    </motion.div>
  )
}

export default PlaylistItem
