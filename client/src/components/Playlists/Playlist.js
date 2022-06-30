import React from 'react'
import { motion } from 'framer-motion'

function Playlist () {
  return (
    <motion.div
    whileHover={{ scale: 1.1 }}
    className='playlistCard'>
        <img></img>
        Playlist
    </motion.div>
  )
}

export default Playlist
