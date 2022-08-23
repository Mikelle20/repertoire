/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';

interface PropsInterface{
  friend: {
    profile_image: string
    display_name: string
    status: number
    user_id: string
  }
  addFriend: (id: string) => void
  deleteFriend: (id: string) => void
}

function FriendResult(props: PropsInterface) {
  const { friend, addFriend, deleteFriend } = props;
  return (
    <div tabIndex={0} className="friendResult">
      <img alt={friend.display_name} src={friend.profile_image} className="searchImg" />
      <span className="searchTitle">{friend.display_name.length >= 15 ? `${friend.display_name.split(' ').slice(0, 2).join(' ')}...` : friend.display_name}</span>
      {friend.status <= 1
        ? friend.status === 0
          ? <motion.img tabIndex={0} src={require('../../assets/icons/add.png')} className="searchAdd" whileTap={{ scale: 0.9 }} onClick={() => addFriend(friend.user_id)} />
          : (
            <span className="pendingButton">
              Pending
              {' '}
              <img alt="pending icon" src={require('../../assets/icons/time.png')} className="pendingPng" />
            </span>
          )
        : friend.status === 2
          ? (
            <div className="acceptDeclineContainer">
              <motion.span tabIndex={0} className="acceptButton" whileTap={{ scale: 0.9 }} onClick={() => addFriend(friend.user_id)}>
                Accept
                <img alt="accept icon" src={require('../../assets/icons/check.png')} className="acceptPng" />
              </motion.span>
              <motion.span tabIndex={0} className="declineButton" whileTap={{ scale: 0.9 }} onClick={() => deleteFriend(friend.user_id)}>
                Decline
                <img alt="decline icon" src={require('../../assets/icons/x.png')} className="declinePng" />
              </motion.span>
            </div>
          )
          : (
            <div className="acceptDeclineContainer">
              <span className="friendButton">Friend</span>
              <motion.span tabIndex={0} className="declineButton" whileTap={{ scale: 0.9 }} onClick={() => deleteFriend(friend.user_id)}>
                Remove
                <img alt="decline icon" src={require('../../assets/icons/x.png')} className="declinePng" />
              </motion.span>
            </div>
          )}
    </div>
  );
}

export default FriendResult;
