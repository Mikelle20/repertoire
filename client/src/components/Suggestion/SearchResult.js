/* eslint-disable no-unused-vars */
/* eslint-disable import/no-absolute-path */
/* eslint-disable react/prop-types */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import explicitPng from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/explicit.png'
import addPng from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/add.png'
import { openModal } from '../../features/searchModalSlice'

function SearchResult (props) {
  const { isOpen } = useSelector(store => store.searchModal)
  const dispatch = useDispatch()
  return (
    <div className='searchResult'>
        <img src={props.track.cover} className='searchImg'></img>
        <span className='searchTitle'>{props.track.title.length >= 15 ? `${props.track.title.split(' ').slice(0, 3).join(' ')}...  - ${props.track.artist}` : `${props.track.title} - ${props.track.artist}`}</span>
        {props.track.explicit && <img src={explicitPng} className='explicitIcon'></img>}
        <motion.img
        whileTap={{ scale: 0.8 }}
        src={addPng}
        onClick={() => dispatch(openModal(props.track))}
        className='searchAdd'>
        </motion.img>
    </div>
  )
}

export default SearchResult
