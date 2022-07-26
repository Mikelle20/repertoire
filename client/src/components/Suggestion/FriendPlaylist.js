/* eslint-disable react/prop-types */
import React from 'react'

function FriendPlaylist (props) {
  return (
    <div
    tabIndex={0}
    onClick={() => props.selectPlaylist(props.playlist.playlistId)}
    className={props.playlist.checked ? 'friendPlaylistClicked' : 'friendPlaylist'}>
        <img src={props.playlist.images.length !== 0 ? props.playlist.images[0].url : require('../../assets/defaults/defaultCover.png')} className='searchImg'></img>
        {props.playlist.name}
    </div>
  )
}

export default FriendPlaylist
