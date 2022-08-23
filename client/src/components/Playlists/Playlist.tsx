/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { SyntheticEvent } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setError } from '../../features/errorSlice';

interface PropsInterface {
  playlist: {
    id: string
    title: string
    isPrivate: boolean
    images: {url: string, width: number, height: number}[]
  }
  removePlaylist: (id: string) => void
}

function Playlist(props: PropsInterface): JSX.Element {
  const { playlist, removePlaylist } = props;
  const navigate = useNavigate();
  const accessToken = JSON.parse(window.sessionStorage.getItem('accessToken')).token || null;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const dispatch = useDispatch();
  const handleClick = (Event: SyntheticEvent) => {
    Event.preventDefault();
    navigate(`/playlist/${playlist.id}`);
  };
  const handleDelete = (id: string): void => {
    axios({
      method: 'DELETE',
      url: '/playlist/deletePlaylist',
      headers,
      data: {
        playlistId: playlist.id,
      },
    }).catch((): void => {
      dispatch(setError(true));
    });
    removePlaylist(id);
  };
  return (
    <motion.div
      tabIndex={0}
      title={playlist.title}
      whileHover={{ scale: 1.1 }}
      className="playlistCard"
    >
      <img alt="" src={playlist.images.length !== 0 ? playlist.images[0].url : require('../../assets/defaults/defaultCover.png')} className="cardImg" />
      <div className="cardTitle">
        {playlist.title.length >= 15 ? `${playlist.title.split(' ').slice(0, 2).join(' ')}...` : playlist.title}
        <img alt="" src={playlist.isPrivate ? require('../../assets/icons/lock.png') : require('../../assets/icons/public.png')} className="cardPng" />

      </div>
      <div className="cardButtonContainer">
        <motion.button
          tabIndex={0}
          whileTap={{ scale: 0.9 }}
          onClick={handleClick}
          className="cardBtn"
        >
          View
        </motion.button>
        <motion.button
          tabIndex={0}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleDelete(playlist.id)}
          className="cardDeleteBtn"
        >
          Delete
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Playlist;
