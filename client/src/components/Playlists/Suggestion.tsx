/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Tooltip } from '@mui/material';
import { initialState } from '../../ratingStates/initStates';
import { setError } from '../../features/errorSlice';

interface PropInterface {
  suggestion: {
    rating: number
    senderId: string
    songId: string
    songName: string
    songImage: string
    senderImage: string
    senderName: string
  }
  playlistId: string
}

function Suggestion(props: PropInterface) {
  const { suggestion, playlistId } = props;
  const accessToken = JSON.parse(window.sessionStorage.getItem('accessToken')).token || null;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const dispatch = useDispatch();
  const rating = (suggestion.rating * 5).toFixed();
  const [fillHeart, setFillHeart] = React.useState(initialState[rating]);

  React.useEffect((): void => {
    setFillHeart(initialState[rating]);
  }, []);

  const handleClick = (id: number): void => {
    setFillHeart((prevState: {id: number, filled: boolean}[]) => {
      const arr = [];
      if (prevState[id].filled) setFillHeart(initialState[0]);
      prevState.forEach((heart: {id: number, filled: boolean}) => {
        if (heart.id <= id) {
          arr.push({
            ...heart,
            filled: true,
          });
        } else {
          arr.push({ ...heart });
        }
      });

      if (prevState[id].filled === false) {
        axios({
          method: 'POST',
          url: '/suggestion/rate',
          withCredentials: true,
          headers,
          data: {
            receiverId: suggestion.senderId,
            rating: (id / 5) + 0.20,
            songId: suggestion.songId,
            playlistId,
          },
        }).catch((): void => {
          dispatch(setError(true));
        });
      }

      return arr;
    });
  };

  return (
    <div tabIndex={0} className="suggestion">
      <Tooltip title={suggestion.senderName}>
        <img alt={suggestion.senderName} src={suggestion.senderImage} className="suggestionImage" />
      </Tooltip>
      <Tooltip title={(
        <img alt={suggestion.songName} className="songImage" src={suggestion.songImage} />
        )}
      >
        <span>{suggestion.songName.length >= 25 ? `${suggestion.songName.split(' ').slice(0, 3).join(' ')}...` : suggestion.songName}</span>
      </Tooltip>
      <span className="rateContainer">
        <img alt="heart" src={fillHeart[0].filled ? require('../../assets/icons/heart_filled.png') : require('../../assets/icons/heart.png')} className="ratingHeart" onClick={() => handleClick(fillHeart[0].id)} />
        <img alt="heart" src={fillHeart[1].filled ? require('../../assets/icons/heart_filled.png') : require('../../assets/icons/heart.png')} className="ratingHeart" onClick={() => handleClick(fillHeart[1].id)} />
        <img alt="heart" src={fillHeart[2].filled ? require('../../assets/icons/heart_filled.png') : require('../../assets/icons/heart.png')} className="ratingHeart" onClick={() => handleClick(fillHeart[2].id)} />
        <img alt="heart" src={fillHeart[3].filled ? require('../../assets/icons/heart_filled.png') : require('../../assets/icons/heart.png')} className="ratingHeart" onClick={() => handleClick(fillHeart[3].id)} />
        <img alt="heart" src={fillHeart[4].filled ? require('../../assets/icons/heart_filled.png') : require('../../assets/icons/heart.png')} className="ratingHeart" onClick={() => handleClick(fillHeart[4].id)} />
      </span>
    </div>
  );
}

export default Suggestion;
