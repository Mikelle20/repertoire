/* eslint-disable no-unused-vars */
import axios from 'axios'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPlaylist, getPlaylistFriends, getSuggestions } from '../features/playlistSlice'
import { useLocation } from 'react-router'
import PlaylistContainer from '../components/Playlists/PlaylistContainer'

function Playlist () {
  const accessToken = window.sessionStorage.getItem('accessToken') || null
  if (!accessToken) window.location.href = '/login'

  const user = JSON.parse(window.localStorage.getItem('user'))
  const playlistId = window.location.pathname.split('/').at(-1)
  const { playlist } = useSelector(store => store.playlist)

  const dispatch = useDispatch()

  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    dispatch(getSuggestions({ user, playlistId }))
    dispatch(getPlaylistFriends({
      user,
      playlistInfo: {
        playlistId,
        isPrivate: playlist.isPrivate
      }
    }))
    axios({
      method: 'POST',
      url: 'http://localhost:5000/playlist/getPlaylist',
      withCredentials: true,
      data: { user, playlistId }
    }).then(res => {
      setData(res.data)
    })
  }, [])

  return (
    <div className='pageContainer'>
      {accessToken && <div className='container'>
        {data && <PlaylistContainer playlist={data} playlistId={playlistId} />}
      </div>}
    </div>
  )
}

export default Playlist
