/* eslint-disable react/prop-types */

import React from 'react'
import { motion } from 'framer-motion'
import { Tooltip } from '@mui/material'

function SideItem (props) {
  return (
    <Tooltip title={props.artist.name}>
      <motion.div
      tabIndex={0}
      whileHover={{ scale: 1.2 }}
      className='sideItem'>
        <img className='topArtist' src={props.artist.images[0].url} alt={props.artist.name}></img>
      </motion.div>
    </Tooltip>
  )
}

export default SideItem
