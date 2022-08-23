/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { Tooltip } from '@mui/material';

interface PropsInterface{
  playlist: {
    playlistId: string
    playlistName: string
    playlistImage: {url: string, width: number, height: number}[]
    isPrivate: boolean
  }
}

function PlaylistItem(props: PropsInterface): JSX.Element {
  const { playlist } = props;
  const navigate = useNavigate();
  const handleClick = (): void => {
    navigate(`/playlist/${playlist.playlistId}`);
  };
  return (
    <Tooltip title={playlist.playlistName}>
      <motion.div
        onClick={handleClick}
        tabIndex={0}
        whileHover={{ scale: 1.2 }}
        className="sideItem"
      >
        <img className="topArtist" src={playlist.playlistImage.length === 0 ? require('../../assets/defaults/defaultCover.png') : playlist.playlistImage[0].url} alt={playlist.playlistName} />
        <img alt={playlist.playlistName} className="homeSuggestionImage" src={playlist.isPrivate ? require('../../assets/icons/lock.png') : require('../../assets/icons/public.png')} />
      </motion.div>
    </Tooltip>
  );
}

export default PlaylistItem;
