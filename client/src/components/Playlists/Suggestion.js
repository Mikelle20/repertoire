/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import axios from 'axios'
import { initialState } from '../../ratingStates/initStates'
import { useDispatch } from 'react-redux'
import { setError } from '../../features/errorSlice'

function Suggestion (props) {
  const accessToken = window.sessionStorage.getItem('accessToken')
  const headers = {
    Authorization: `Bearer ${accessToken}`
  }
  const dispatch = useDispatch()

  React.useEffect(() => {
    setFillHeart(initialState[props.suggestion.rating])
  }, [])

  const [fillHeart, setFillHeart] = React.useState(initialState[0])

  const handleClick = (id) => {
    setFillHeart(prevState => {
      const arr = []
      if (prevState[id].filled) setFillHeart(initialState[0])
      prevState.forEach(heart => {
        if (heart.id <= id) {
          arr.push({
            ...heart,
            filled: true
          })
        } else {
          arr.push({ ...heart })
        }
      })

      if (prevState[id].filled === false) {
        axios({
          method: 'POST',
          url: 'http://localhost:5000/suggestion/rate',
          withCredentials: true,
          headers,
          data: {
            receiverId: props.suggestion.senderId,
            rating: (id / 4) + 0.25,
            songId: props.suggestion.songId,
            playlistId: props.playlistId
          }
        }).catch(res => {
          dispatch(setError(true))
        })
      }

      return arr
    })
  }

  return (
    <div className='suggestion'>
        <img src={props.suggestion.senderImage} className='suggestionImage' />
        <span>{props.suggestion.songName.length >= 25 ? `${props.suggestion.songName.split(' ').slice(0, 3).join(' ')}...` : props.suggestion.songName}</span>
        <span className='rateContainer'>
          <img src={fillHeart[0].filled ? require('../../assets/icons/heart_filled.png') : require('../../assets/icons/heart.png')} className='ratingHeart' onClick={() => handleClick(fillHeart[0].id)}></img>
          <img src={fillHeart[1].filled ? require('../../assets/icons/heart_filled.png') : require('../../assets/icons/heart.png')} className='ratingHeart' onClick={() => handleClick(fillHeart[1].id)}></img>
          <img src={fillHeart[2].filled ? require('../../assets/icons/heart_filled.png') : require('../../assets/icons/heart.png')} className='ratingHeart' onClick={() => handleClick(fillHeart[2].id)}></img>
          <img src={fillHeart[3].filled ? require('../../assets/icons/heart_filled.png') : require('../../assets/icons/heart.png')} className='ratingHeart' onClick={() => handleClick(fillHeart[3].id)}></img>
        </span>
    </div>
  )
}

export default Suggestion
