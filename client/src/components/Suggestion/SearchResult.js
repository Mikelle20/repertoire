/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { openModal } from '../../features/searchModalSlice'

function SearchResult (props) {
  const dispatch = useDispatch()
  return (
    <div tabIndex={0} className='searchResult'>
        <img src={props.track.cover} className='searchImg'></img>
        <span className='searchTitle'>{props.track.title.length >= 15 ? `${props.track.title.split(' ').slice(0, 3).join(' ')}...  - ${props.track.artist}` : `${props.track.title} - ${props.track.artist}`}</span>
        {props.track.explicit && <img src={require('../../assets/icons/explicit.png')} className='explicitIcon'></img>}
        <motion.img
        tabIndex={0}
        whileTap={{ scale: 0.8 }}
        src={require('../../assets/icons/add.png')}
        onClick={() => dispatch(openModal(props.track))}
        className='searchAdd'>
        </motion.img>
    </div>
  )
}

export default SearchResult
