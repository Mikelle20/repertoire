/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import React from 'react';

interface PropsInterface {
  friend: {
    profile_image: string
    display_name: string
    user_id: string
  }
}

function PlaylistFriend(props: PropsInterface): JSX.Element {
  const { friend } = props;
  return (
    <motion.div tabIndex={0} whileHover={{ scale: 1.1 }} className="friendContainer">
      <img alt={friend.display_name} src={friend.profile_image} className="friendIcon" />
      <div className="playFriendName">{friend.display_name.length >= 7 ? `${friend.display_name.split(' ').slice(0, 3).join(' ')}` : friend.display_name}</div>
    </motion.div>
  );
}

export default PlaylistFriend;
