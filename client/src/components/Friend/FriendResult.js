/* eslint-disable import/no-absolute-path */
/* eslint-disable react/prop-types */
import React from 'react'
import addPng from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/add.png'
import time from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/time.png'
import accept from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/check.png'
import decline from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/x.png'
import { motion } from 'framer-motion'

function FriendResult (props) {
  return (
    <div className='friendResult'>
    <img src={props.friend.profile_image} className='searchImg'></img>
    <span className='searchTitle'>{props.friend.display_name >= 15 ? `${props.friend.display_name.split(' ').slice(0, 2).join(' ')}...` : props.friend.display_name}</span>
    {props.friend.status <= 1
      ? props.friend.status === 0
        ? <motion.img src={addPng} className='searchAdd' whileTap={{ scale: 0.9 }} onClick={() => props.addFriend(props.friend.user_id)}></motion.img>
        : <span className='pendingButton'>Pending <img src={time} className='pendingPng'></img></span>
      : props.friend.status === 2
        ? <div className='acceptDeclineContainer'>
        <motion.span className='acceptButton' whileTap={{ scale: 0.9 }} onClick={() => props.addFriend(props.friend.user_id)}>Accept <img src={accept} className='acceptPng'></img></motion.span>
        <motion.span className='declineButton' whileTap={{ scale: 0.9 }} onClick={() => props.deleteFriend(props.friend.user_id)}>Decline <img src={decline} className='declinePng'></img></motion.span>
      </div>
        : <div className='acceptDeclineContainer'>
            <span className='friendButton'>Friend</span>
            <motion.span className='declineButton' whileTap={{ scale: 0.9 }} onClick={() => props.deleteFriend(props.friend.user_id)}>Remove<img src={decline} className='declinePng'></img></motion.span>
          </div>}
</div>
  )
}

export default FriendResult
