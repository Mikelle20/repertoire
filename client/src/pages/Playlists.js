/* eslint-disable no-unused-vars */
/* eslint-disable import/no-absolute-path */
import React from 'react'
import Playlist from '../components/Playlists/Playlist'
import { motion } from 'framer-motion'
import addPng from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/newPlaylist.png'
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

  const [playlists, setPlaylists] = React.useState([])
  const [friends, setFriends] = React.useState([])

  const dispatch = useDispatch()

  React.useEffect(() => {
    axios.get('/friends/getFriends', { withCredentials: true, headers }).then(res => {
      setFriends(res.data)
    })

    axios.get('/playlist/getPlaylists', { withCredentials: true, headers }).then(res => {
      setPlaylists(res.data)
    })
  }, [])

  const playlistCards = playlists.map((playlist) => {
    return <Playlist key={playlist.id} playlist={playlist} />
  })
  return (
        <div className='landingContainer'>
        <div className='pageContainer'>
            {isOpen && <PlaylistModal friends={friends}/>}
            <div className='playlistContainer'>
                {playlists && playlistCards}
                {accessToken && <motion.button
                className='newPlaylistBtn'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => dispatch(openModal())}
                >
                <img src={addPng}></img>
                </motion.button>}
            </div>
        </div>
      </div>
  )
}

export default Playlists
