/* eslint-disable react/prop-types */
import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import { Tooltip } from '@mui/material'

function SuggestionItem (props) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/playlist/${props.suggestion.playlistId}`)
  }
  return (
    <Tooltip title={`${props.suggestion.songName} from ${props.suggestion.senderName}`}>
      <motion.div
      onClick={handleClick}
      tabIndex={0}
      whileHover={{ scale: 1.2 }}
      className='sideItem'>
        <img className='topArtist' src={props.suggestion.songImage[0].url} alt={props.suggestion.songName}></img>
        <img className='homeSuggestionImage' src={props.suggestion.senderImage} />
      </motion.div>
    </Tooltip>
  )
}

export default SuggestionItem
