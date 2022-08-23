/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { Tooltip } from '@mui/material';

interface PropsInterface {
  suggestion: {
    playlistId: string
    songName: string
    senderName: string
    senderImage: string
    songImage: {url: string, width: number, height: number}[]
  }
}

function SuggestionItem(props: PropsInterface): JSX.Element {
  const { suggestion } = props;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/playlist/${suggestion.playlistId}`);
  };
  return (
    <Tooltip title={`${suggestion.songName} from ${suggestion.senderName}`}>
      <motion.div
        onClick={handleClick}
        tabIndex={0}
        whileHover={{ scale: 1.2 }}
        className="sideItem"
      >
        <img className="topArtist" src={suggestion.songImage[0].url} alt={suggestion.songName} />
        <img alt={suggestion.senderName} className="homeSuggestionImage" src={suggestion.senderImage} />
      </motion.div>
    </Tooltip>
  );
}

export default SuggestionItem;
