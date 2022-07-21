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
    return <Suggestion key={suggestion.songId} suggestion={suggestion} playlistId={props.playlistId} />
  })
  const friendIcons = playlistFriends.map(friend => {
    return <PlaylistFriend key={friend.user_id} friend={friend} />
  })
  return (
    <motion.div drag dragSnapToOrigin className='playContainer'>
        <div className='leftPlayContainer'>
          <motion.img whileHover={{ scale: 1.1 }} src={props.playlist.images.length === 0 ? require('../../assets/defaults/defaultCover.png') : props.playlist.images[0].url} className='playlistPageCover'></motion.img>
          <motion.div whileHover={{ scale: 1.1 }} className='playlistTitle'>{props.playlist.name}</motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className='playlistDescription'>{props.playlist.description}</motion.div>
          <div className='playlistFriendsContainer'>
            {friendIcons.length !== 0
              ? friendIcons
              : <div className='emptyMessage'>No Friends</div>
            }
          </div>
        </div>
        <div className='rightPlayContainer'>
          <div className='suggestContainer'>
            {suggestions.length !== 0
              ? suggestions
              : <div className='emptyMessage'>No Suggestions</div>
            }
          </div>
        </div>
    </motion.div>
  )
}

export default PlaylistContainer
