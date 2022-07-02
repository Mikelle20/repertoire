/* eslint-disable import/no-absolute-path */
/* eslint-disable react/prop-types */
import React from 'react'
import defaultCover from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/defaults/defaultCover.png'

function FriendPlaylist (props) {
  return (
    <div
    onClick={() => props.selectPlaylist(props.playlist.playlistId)}
    className={props.playlist.checked ? 'friendPlaylistClicked' : 'friendPlaylist'}>
        <img src={props.playlist.images.length !== 0 ? props.playlist.images[0].url : defaultCover} className='searchImg'></img>
        {props.playlist.name}
    </div>
  )
}

export default FriendPlaylist
