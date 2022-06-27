import React from 'react'
import { motion } from 'framer-motion'

function SideItem () {
  return (
    <motion.div
    whileHover={{ scale: 1.2 }}
    className='sideItem'>
      Side Item
    </motion.div>
  )
}

export default SideItem
