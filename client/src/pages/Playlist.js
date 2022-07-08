/* eslint-disable no-unused-vars */
import axios from 'axios'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPlaylist } from '../features/playlistSlice'
import { useLocation } from 'react-router'
import PlaylistContainer from '../components/Playlists/PlaylistContainer'

function Playlist () {
  const location = useLocation()
  const image = location.state.images[0].url
  const user = JSON.parse(window.localStorage.getItem('user'))
  const playlistId = window.location.pathname.split('/').at(-1)
  const { playlist } = useSelector(store => store.playlist)
  // const [playlistInfo, setPlaylistInfo] = React.useState({})

  const dispatch = useDispatch()

  React.useEffect(() => {
    axios({
      method: 'POST',
      url: 'http://localhost:5000/playlist/friendsAccess',
      data: {
        user,
        playlistInfo: {
          playlistId: location.state.id,
          isPrivate: location.state.isPrivate
        }
      }
    }).then(res => {
      console.log(res.data)
    })
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
