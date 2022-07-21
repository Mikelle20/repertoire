/* eslint-disable react/prop-types */
import React from 'react'
import { motion } from 'framer-motion'
import { Tooltip } from '@mui/material'

function RecentItem (props) {
  return (
    <Tooltip title={`${props.listen.friendName} was listening to ${props.listen.songName}`}>
      <motion.div
    whileHover={{ scale: 1.2 }}
    className='sideItem'>
      <img className='topArtist' src={props.listen.songImage} alt={props.listen.songName}></img>
      <img className='homeSuggestionImage' src={props.listen.friendImage} />
    </motion.div>
    </Tooltip>
  )
}

export default RecentItem
