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

function Playlists () {
  const { isOpen } = useSelector(state => state.playlistModal)
  const { playlists } = useSelector(store => store.playlist)
  const user = JSON.parse(window.localStorage.getItem('user'))
  // const [playlists, setPlaylists] = React.useState([])
  const dispatch = useDispatch()

  // React.useEffect(() => {
  //   console.log('hi')
  //   axios({
  //     method: 'POST',
  //     url: '/playlist/getPlaylists',
  //     withCredentials: true,
  //     data: { user }
  //   }).then(res => {
  //     console.log(res.data)
  //     setPlaylists([...res.data])
  //   })
  // }, [isOpen])

  React.useEffect(() => {
    dispatch(getPlaylists(user))
    console.log(playlists)
  }, [isOpen])

  const playlistCards = playlists.map((playlist) => {
    return <Playlist key={playlist.id} playlist={playlist} />
  })
  return (
        <div className='landingContainer'>
            <div className='pageContainer'>
                Playlists
                {isOpen && <PlaylistModal/>}
                <div className='playlistContainer'>
                    {playlistCards}
                    <motion.button
                    className='newPlaylistBtn'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => dispatch(openModal())}
                    >
                    <img src={addPng}></img>
                    </motion.button>
                </div>
            </div>
        </div>
  )
}

export default Playlists
