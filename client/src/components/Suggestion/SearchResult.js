/* eslint-disable import/no-absolute-path */
/* eslint-disable react/prop-types */
import React from 'react'
import explicitPng from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/explicit.png'

function SearchResult (props) {
  return (
    <div className='searchResult'>
        <img src={props.track.cover} className='searchImg'></img>
        <span className='searchTitle'>{props.track.title.length >= 15 ? `${props.track.title.split(' ').slice(0, 3).join(' ')}...  - ${props.track.artist}` : `${props.track.title} - ${props.track.artist}`}</span>
        {props.track.explicit && <img src={explicitPng} className='explicitIcon'></img>}
    </div>
  )
}

export default SearchResult
