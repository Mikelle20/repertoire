/* eslint-disable react/prop-types */
import { motion } from 'framer-motion'
import React from 'react'

function PlaylistFriend (props) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} className='friendContainer'>
        <img src={props.friend.profile_image } className='friendIcon'></img>
        <div className='playFriendName'>{props.friend.display_name.length >= 7 ? `${props.friend.display_name.split(' ').slice(0, 3).join(' ')}` : props.friend.display_name}</div>
    </motion.div>
  )
}

export default PlaylistFriend
