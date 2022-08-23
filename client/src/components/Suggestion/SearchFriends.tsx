/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable react/prop-types */
import React from 'react';

type HandleClick = (id: string) => void

interface PropsInterface {
  friend: {
    checked: boolean
    profile_image: string
    user_id: string
    display_name: string
  }
  handleClick: HandleClick
}

function SearchFriends(props: PropsInterface): JSX.Element {
  const { friend, handleClick } = props;
  return (
    <div tabIndex={0} className={friend.checked ? 'clickedFriend' : 'friendContainer'} onClick={() => handleClick(friend.user_id)}>
      <img alt={friend.display_name} src={friend.profile_image} className="friendIcon" />
      <div className="friendName">{friend.display_name.length >= 7 ? `${friend.display_name.split(' ').slice(0, 3).join(' ')}` : friend.display_name}</div>
    </div>
  );
}

export default SearchFriends;
