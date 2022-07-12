/* eslint-disable react/prop-types */
import React from 'react'
// import { motion } from 'framer-motion'
// import heart from 'Us'

function SocialItem (props) {
  return (
    <>
    {props.social.type
      ? <div className='socialItem'>
        <img className ='socialUserImg' src={props.social.senderImage}></img>
        <span className='socialSong'>{props.social.senderName + ' gave ' + (props.social.songName.length >= 1500 ? ` ${props.social.songName.split(' ').slice(0, 3).join(' ')}... ` : props.social.songName) + ' a ' + props.social.rating * 4}</span>
    </div>
      : <div className='socialItem'>
           <img className ='socialUserImg' src={props.social.ownerImage}></img>
           <span className='socialSong'>{props.social.ownerName + ' added you to ' + (props.social.playlistName.length >= 15 ? ` ${props.social.playlistName.split(' ').slice(0, 3).join(' ')}... ` : props.social.playlistName)}</span>
        </div>}
    </>
  )
}

export default SocialItem
