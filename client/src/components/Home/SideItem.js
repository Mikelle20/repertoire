/* eslint-disable react/prop-types */

import React from 'react'
import { motion } from 'framer-motion'

function SideItem (props) {
  return (
    <motion.div
    whileHover={{ scale: 1.2 }}
    className='sideItem'>
      <img className='topArtist' src={props.image} alt={props.name}></img>
    </motion.div>
  )
}

export default SideItem
