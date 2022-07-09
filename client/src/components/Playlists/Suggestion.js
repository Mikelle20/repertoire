/* eslint-disable no-unused-vars */
/* eslint-disable import/no-absolute-path */
/* eslint-disable react/prop-types */
import React from 'react'
import heart from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/heart.png'
import filledHeart from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/heart_filled.png'
function Suggestion (props) {
  const [fillHeart, setFillHeart] = React.useState([
    {
      id: 0,
      filled: false
    },
    {
      id: 1,
      filled: false
    },
    {
      id: 2,
      filled: false
    },
    {
      id: 3,
      filled: false
    }
  ])

  const [lockFill, setLockFill] = React.useState(false)

  const handleFill = (id) => {
    setFillHeart(prevState => {
      const arr = []
      prevState.forEach(heart => {
        if (heart.id <= id) {
          arr.push({
            ...heart,
            filled: lockFill ? true : !heart.filled
          })
        } else {
          // if (lockFill) {
          //   arr.push({
          //     ...heart,
          //     filled: false
          //   })
          // } else {
          //   arr.push({ ...heart })
          // }
          arr.push({ ...heart })
        }
      })
      return arr
    })
  }

  const handleClick = () => {
    setLockFill(prevState => !prevState)
  }

  return (
    <div className='suggestion'>
        <img src={props.suggestion.senderImage} className='suggestionImage' />
        <span>{props.suggestion.songName.length >= 25 ? `${props.suggestion.songName.split(' ').slice(0, 3).join(' ')}...` : props.suggestion.songName}</span>
        <span className='rateContainer'>
          {/* {showRating && <div className='heartsContainer' onMouseOver={() => setShowRating(true)} onMouseOut={() => setShowRating(false)}>
            hello
            </div>} */}
          <img src={fillHeart[0].filled ? filledHeart : heart} className='ratingHeart' onMouseOver={() => handleFill(fillHeart[0].id)} onMouseOut={() => handleFill(fillHeart[0].id)} onClick={() => handleClick()}></img>
          <img src={fillHeart[1].filled ? filledHeart : heart} className='ratingHeart' onMouseOver={() => handleFill(fillHeart[1].id)} onMouseOut={() => handleFill(fillHeart[1].id)} onClick={() => handleClick()}></img>
          <img src={fillHeart[2].filled ? filledHeart : heart} className='ratingHeart' onMouseOver={() => handleFill(fillHeart[2].id)} onMouseOut={() => handleFill(fillHeart[2].id)} onClick={() => handleClick()}></img>
          <img src={fillHeart[3].filled ? filledHeart : heart} className='ratingHeart' onMouseOver={() => handleFill(fillHeart[3].id)} onMouseOut={() => handleFill(fillHeart[3].id)} onClick={() => handleClick()}></img>
        </span>
    </div>
  )
}

export default Suggestion
