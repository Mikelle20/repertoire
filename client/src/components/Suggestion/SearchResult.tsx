/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { openModal } from '../../features/searchModalSlice';

interface PropsInterface{
  track: {
    title: string
    cover: string
    explicit: boolean
    artist: string
    songId: string
  }
}

function SearchResult(props: PropsInterface): JSX.Element {
  const { track } = props;
  const dispatch = useDispatch();
  return (
    <div tabIndex={0} className="searchResult">
      <img alt={track.title} src={track.cover} className="searchImg" />
      <span className="searchTitle">{track.title.length >= 15 ? `${track.title.split(' ').slice(0, 3).join(' ')}...  - ${track.artist}` : `${track.title} - ${track.artist}`}</span>
      {track.explicit && <img alt="explicit" src={require('../../assets/icons/explicit.png')} className="explicitIcon" />}
      <motion.img
        tabIndex={0}
        whileTap={{ scale: 0.8 }}
        src={require('../../assets/icons/add.png')}
        onClick={() => dispatch(openModal(track))}
        className="searchAdd"
      />
    </div>
  );
}

export default SearchResult;
