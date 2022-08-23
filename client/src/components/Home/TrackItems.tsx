/* eslint-disable react/prop-types */
import React from 'react';
import { Tooltip } from '@mui/material';
import { motion } from 'framer-motion';

interface PropsInterface {
  track: {
    name: string
    album: {
      images: {url: string, width: number, height: number}[]
    }
  }
}

function TrackItems(props: PropsInterface): JSX.Element {
  const { track } = props;
  return (
    <Tooltip title={track.name}>
      <motion.div
        tabIndex={0}
        whileHover={{ scale: 1.2 }}
        className="sideItem"
      >
        <img className="topArtist" src={track.album.images[0].url} alt={track.name} />
      </motion.div>
    </Tooltip>
  );
}

export default TrackItems;
