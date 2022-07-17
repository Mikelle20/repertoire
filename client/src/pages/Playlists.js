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
import { getPlaylists } from '../features/playlistSlice'
import { getFriends } from '../features/friendsSlice'

function Playlists () {
  const accessToken = window.sessionStorage.getItem('accessToken') || null
  if (!accessToken) window.location.href = '/login'

  const { isOpen } = useSelector(state => state.playlistModal)
  const { playlists } = useSelector(store => store.playlist)
  const user = JSON.parse(window.localStorage.getItem('user'))
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getPlaylists(user))
    dispatch(getFriends(user))
  }, [])

  const playlistCards = playlists.map((playlist) => {
    return <Playlist key={playlist.id} playlist={playlist} />
  })
  return (
        <div className='landingContainer'>
        <div className='pageContainer'>
            {isOpen && <PlaylistModal/>}
            <div className='playlistContainer'>
                {playlistCards}
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
