/* eslint-disable no-unused-vars */
/* eslint-disable import/no-absolute-path */
/* eslint-disable react/prop-types */
import React from 'react'
import heart from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/heart.png'
function Suggestion (props) {
  const [showRating, setShowRating] = React.useState(true)
  return (
    <div className='suggestion'>
        <img src={props.suggestion.senderImage} className='suggestionImage' />
        <span>{props.suggestion.songName.length >= 25 ? `${props.suggestion.songName.split(' ').slice(0, 3).join(' ')}...` : props.suggestion.songName}</span>
        <span className='rateContainer'>
          {showRating && <div className='heartsContainer' onMouseOver={() => setShowRating(true)} onMouseOut={() => setShowRating(false)}>
            hello
            </div>}
          <img src={heart} className='ratingHeart' onMouseOver={() => setShowRating(true)} onMouseOut={() => setShowRating(false)}></img>
        </span>
    </div>
  )
}

export default Suggestion
