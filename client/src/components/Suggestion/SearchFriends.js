/* eslint-disable react/prop-types */
import React from 'react'

function SearchFriends (props) {
  return (
    <div tabIndex={0} className={props.friend.checked ? 'clickedFriend' : 'friendContainer'} onClick={() => props.handleClick(props.friend.user_id)}>
        <img src={props.friend.profile_image } className='friendIcon'></img>
        <div className='friendName'>{props.friend.display_name.length >= 7 ? `${props.friend.display_name.split(' ').slice(0, 3).join(' ')}` : props.friend.display_name}</div>
    </div>
  )
}

export default SearchFriends
