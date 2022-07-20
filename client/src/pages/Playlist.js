/* eslint-disable no-unused-vars */
import axios from 'axios'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFriends, setSuggestions } from '../features/playlistSlice'
import PlaylistContainer from '../components/Playlists/PlaylistContainer'
import { setError } from '../features/errorSlice'

function Playlist () {
  const accessToken = window.sessionStorage.getItem('accessToken') || null
  if (!accessToken) window.location.href = '/login'

  const playlistId = window.location.pathname.split('/').at(-1)
  const { playlist } = useSelector(store => store.playlist)
  const { error } = useSelector(store => store.error)

  const headers = {
    Authorization: `Bearer ${accessToken}`
  }
  const dispatch = useDispatch()

  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    axios.post('/suggestion/getSuggestions', { playlistId }, { withCredentials: true, headers }).then(res => {
      dispatch(setSuggestions(res.data))
    }).catch(res => {
      dispatch(setError(true))
    })

    axios.post('/playlist/friendsAccess', { playlistInfo: { playlistId, isPrivate: playlist.isPrivate } }, { withCredentials: true, headers }).then(res => {
      dispatch(setFriends(res.data))
    }).catch(res => {
      dispatch(setError(true))
    })
    axios.post('/playlist/getPlaylist', { playlistId }, { withCredentials: true, headers }).then(res => {
      setData(res.data)
    }).catch(res => {
      dispatch(setError(true))
    })
  }, [])

  return (
    <div className='pageContainer'>
      {error.isError
        ? <div className='loadingScreen'>{error.error}</div>
        : <div className='container'>
        {data && <PlaylistContainer playlist={data} playlistId={playlistId} />}
      </div>}
    </div>
  )
}

export default Playlist
