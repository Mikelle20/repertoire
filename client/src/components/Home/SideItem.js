/* eslint-disable react/prop-types */

import React from 'react'
import { motion } from 'framer-motion'

function SideItem (props) {
  return (
    <motion.div
    whileHover={{ scale: 1.2 }}
    className='sideItem'>
      {props.artist.image}
      help
    </motion.div>
  )
}

export default SideItem
