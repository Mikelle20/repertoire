/* eslint-disable no-unused-vars */
import axios from 'axios'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPlaylist, getPlaylistFriends, getSuggestions } from '../features/playlistSlice'
import { useLocation } from 'react-router'
import PlaylistContainer from '../components/Playlists/PlaylistContainer'

function Playlist () {
  const location = useLocation()
  const image = location.state.images[0].url
  const user = JSON.parse(window.localStorage.getItem('user'))
  const playlistId = window.location.pathname.split('/').at(-1)
  const { playlist } = useSelector(store => store.playlist)

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getSuggestions({ user, playlistId }))
    dispatch(getPlaylistFriends({
      user,
      playlistInfo: {
        playlistId: location.state.id,
        isPrivate: location.state.isPrivate
      }
    }))
    dispatch(getPlaylist({ user, playlistId }))
  }, [])

  return (
    <div className='pageContainer'>
      <div className='container'>
        <PlaylistContainer playlist={playlist} image={image}/>
      </div>
    </div>
  )
}

export default Playlist
