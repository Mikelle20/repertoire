/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable react/prop-types */
import React from 'react';
// import { motion } from 'framer-motion'
// import heart from 'Us'

interface PropsInterface {
  social: {
    senderImage: string
    senderName: string
    ownerName: string
    songName: string
    playlistName: string
    rating: number
    type: boolean
    ownerImage: string
  }
}

function SocialItem(props: PropsInterface) {
  const { social } = props;
  return (
    <div>
      {social.type
        ? (
          <div tabIndex={0} className="socialItem">
            <img alt={social.senderName} className="socialUserImg" src={social.senderImage} />
            <span className="socialSong">{`${social.senderName} gave ${social.songName.length >= 1500 ? ` ${social.songName.split(' ').slice(0, 3).join(' ')}... ` : social.songName} a ${(social.rating * 5).toFixed(0)}`}</span>
          </div>
        )
        : (
          <div tabIndex={0} className="socialItem">
            <img alt={social.ownerName} className="socialUserImg" src={social.ownerImage} />
            <span className="socialSong">{`${social.ownerName} added you to ${social.playlistName.length >= 15 ? ` ${social.playlistName.split(' ').slice(0, 3).join(' ')}... ` : social.playlistName}`}</span>
          </div>
        )}
    </div>
  );
}

export default SocialItem;
