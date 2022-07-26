/* eslint-disable react/prop-types */
import React from 'react'
import { Tooltip } from '@mui/material'
import { motion } from 'framer-motion'

function TrackItems (props) {
  return (
    <Tooltip title={props.track.name}>
      <motion.div
      tabIndex={0}
      whileHover={{ scale: 1.2 }}
      className='sideItem'>
        <img className='topArtist' src={props.track.album.images[0].url} alt={props.track.name}></img>
      </motion.div>
    </Tooltip>
  )
}

export default TrackItems
