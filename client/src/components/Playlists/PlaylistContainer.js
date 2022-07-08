/* eslint-disable react/prop-types */
import React from 'react'
import { motion } from 'framer-motion'

function PlaylistContainer (props) {
  return (
    <div className='playContainer'>
        <div className='leftPlayContainer'>
          <motion.img whileHover={{ scale: 1.1 }} src={props.image} className='playlistPageCover'></motion.img>
          <div>{props.playlist.name}</div>
          <div>{props.playlist.description}</div>
        </div>
        <div className='rightPlayContainer'>
        </div>
    </div>
  )
}

export default PlaylistContainer
