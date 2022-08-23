/* eslint-disable react/prop-types */

import React from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from '@mui/material';

interface PropsInterface{
  artist: {
    name: string
    images: {url: string, width: number, height: number}[]
  }
}

function SideItem(props: PropsInterface): JSX.Element {
  const { artist } = props;
  return (
    <Tooltip title={artist.name}>
      <motion.div
        tabIndex={0}
        whileHover={{ scale: 1.2 }}
        className="sideItem"
      >
        <img className="topArtist" src={artist.images[0].url} alt={artist.name} />
      </motion.div>
    </Tooltip>
  );
}

export default SideItem;
