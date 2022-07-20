/* eslint-disable react/prop-types */
import React from 'react'
import { motion } from 'framer-motion'

function RecentItem (props) {
  return (
    <motion.div
    whileHover={{ scale: 1.2 }}
    className='sideItem' title={`${props.listen.friendName} was listening to ${props.listen.songName}`}>
      <img className='topArtist' src={props.listen.songImage} alt={props.listen.songName}></img>
      <img className='homeSuggestionImage' src={props.listen.friendImage} />
    </motion.div>
  )
}

export default RecentItem
