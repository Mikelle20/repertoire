/* eslint-disable react/prop-types */

import React from 'react'
import { motion } from 'framer-motion'

function SideItem (props) {
  return (
    <motion.div
    title={props.artist.name}
    whileHover={{ scale: 1.2 }}
    className='sideItem'>
      <img className='topArtist' src={props.artist.images[0].url} alt={props.artist.name}></img>
    </motion.div>
  )
}

export default SideItem
