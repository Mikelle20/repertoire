/* eslint-disable react/prop-types */
import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import PlaylistFriend from './PlaylistFriend'
import Suggestion from './Suggestion'

function PlaylistContainer (props) {
  const { playlistFriends } = useSelector(store => store.playlist)
  const { playlistSuggestions } = useSelector(store => store.playlist)

  const suggestions = playlistSuggestions.map(suggestion => {
    return <Suggestion key={suggestion.songId} suggestion={suggestion} />
  })
  const friendIcons = playlistFriends.map(friend => {
    return <PlaylistFriend key={friend.user_id} friend={friend} />
  })
  return (
    <motion.div drag dragSnapToOrigin className='playContainer'>
        <div className='leftPlayContainer'>
          <motion.img whileHover={{ scale: 1.1 }} src={props.image} className='playlistPageCover'></motion.img>
          <motion.div whileHover={{ scale: 1.1 }} className='playlistTitle'>{props.playlist.name}</motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className='playlistDescription'>{props.playlist.description}</motion.div>
          <div className='playlistFriendsContainer'>
            {friendIcons}
          </div>
        </div>
        <div className='rightPlayContainer'>
          <div className='suggestContainer'>
            {suggestions}
          </div>
        </div>
    </motion.div>
  )
}

export default PlaylistContainer
