/* eslint-disable no-unused-vars */
import axios from 'axios'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPlaylist, getPlaylistFriends, getSuggestions, setFriends, setSuggestions } from '../features/playlistSlice'
import PlaylistContainer from '../components/Playlists/PlaylistContainer'

function Playlist () {
  const accessToken = window.sessionStorage.getItem('accessToken') || null
  if (!accessToken) window.location.href = '/login'

  const playlistId = window.location.pathname.split('/').at(-1)
  const { playlist } = useSelector(store => store.playlist)

  const headers = {
    Authorization: `Bearer ${accessToken}`
  }
  const [error, SetError] = React.useState({
    isError: false,
    error: ''
  })
  const dispatch = useDispatch()

  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    axios.post('/suggestion/getSuggestions', { playlistId }, { withCredentials: true, headers }).then(res => {
      dispatch(setSuggestions(res.data))
    })

    axios.post('/playlist/friendsAccess', { playlistInfo: { playlistId, isPrivate: playlist.isPrivate } }, { withCredentials: true, headers }).then(res => {
      dispatch(setFriends(res.data))
    })
    axios({
      method: 'POST',
      url: 'http://localhost:5000/playlist/getPlaylist',
      withCredentials: true,
      headers,
      data: { playlistId }
    }).then(res => {
      dispatch(setData(res.data))
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
