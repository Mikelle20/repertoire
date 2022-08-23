/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from '@mui/material';

interface PropsInterface{
  listen: {
    friendName: string
    songName: string
    songImage: string
    friendImage: string
  }
}

function RecentItem(props: PropsInterface): JSX.Element {
  const { listen } = props;
  return (
    <Tooltip title={`${listen.friendName} was listening to ${listen.songName}`}>
      <motion.div
        tabIndex={0}
        whileHover={{ scale: 1.2 }}
        className="sideItem"
      >
        <img className="topArtist" src={listen.songImage} alt={listen.songName} />
        <img alt={listen.friendName} className="homeSuggestionImage" src={listen.friendImage} />
      </motion.div>
    </Tooltip>
  );
}

export default RecentItem;
