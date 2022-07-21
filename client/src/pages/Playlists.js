/* eslint-disable no-unused-vars */
import React from 'react'
import Playlist from '../components/Playlists/Playlist'
import { motion } from 'framer-motion'
import PlaylistModal from '../components/Playlists/PlaylistModal'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../features/PlaylistModalSlice'
import axios from 'axios'

function Playlists () {
  const accessToken = window.sessionStorage.getItem('accessToken') || null
  if (!accessToken) window.location.href = '/login'

  const { isOpen } = useSelector(state => state.playlistModal)

  const headers = {
    Authorization: `Bearer ${accessToken}`
  }

  const { error } = useSelector(store => store.error)
  const [playlists, setPlaylists] = React.useState([])
  const [friends, setFriends] = React.useState([])
  const [newPlaylist, setNewPlaylist] = React.useState(false)

  const dispatch = useDispatch()

  React.useEffect(() => {
    axios.get('/friends/getFriends', { withCredentials: true, headers }).then(res => {
      setFriends(res.data)
    })

    axios.get('/playlist/getPlaylists', { withCredentials: true, headers }).then(res => {
      setPlaylists(res.data)
    })
  }, [newPlaylist])

  const removePlaylist = (id) => {
    setPlaylists(prev => {
      return prev.filter(playlist => playlist.id !== id)
    })
  }

  const renderPlaylists = () => {
    setNewPlaylist(prev => {
      return !prev
    })
  }

  const playlistCards = playlists.map((playlist) => {
    return <Playlist key={playlist.id} removePlaylist={removePlaylist} playlist={playlist} />
  })
  return (
        <div className='landingContainer'>
        {error.isError
          ? <div className='loadingScreen'>{error.error}</div>
          : <div className='pageContainer'>
            {isOpen && <PlaylistModal renderPlaylists={renderPlaylists} friends={friends}/>}
            <div className='playlistContainer'>
                {playlists && playlistCards}
                {accessToken && <motion.button
                className='newPlaylistBtn'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => dispatch(openModal())}
                >
                <img src={require('../assets/icons/newPlaylist.png')}></img>
                </motion.button>}
            </div>
        </div>}
      </div>
  )
}

export default Playlists
