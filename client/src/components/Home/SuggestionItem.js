/* eslint-disable react/prop-types */
import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'

function SuggestionItem (props) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/playlist/${props.suggestion.playlistId}`)
  }
  return (
    <motion.div
    onClick={handleClick}
    whileHover={{ scale: 1.2 }}
    className='sideItem' title={`${props.suggestion.songName} from ${props.suggestion.senderName}`}>
      <img className='topArtist' src={props.suggestion.songImage[0].url} alt={props.suggestion.songName}></img>
      <img className='homeSuggestionImage' src={props.suggestion.senderImage} />
    </motion.div>
  )
}

export default SuggestionItem
