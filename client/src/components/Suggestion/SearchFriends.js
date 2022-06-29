/* eslint-disable react/prop-types */
import React from 'react'

function SearchFriends (props) {
  return (
    <div className='searchFriendsContainer'>
        <img src={props.friend.profile_image } className='friendIcon'></img>
        <div className='friendName'>{props.friend.display_name}</div>
    </div>
  )
}

export default SearchFriends
