/* eslint-disable no-unused-vars */
/* eslint-disable import/no-absolute-path */
import React from 'react'
import Playlist from '../components/Playlists/Playlist'
import { motion } from 'framer-motion'
import addPng from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/newPlaylist.png'
import PlaylistModal from '../components/Playlists/PlaylistModal'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../features/PlaylistModalSlice'

function Playlists () {
  const { isOpen } = useSelector(state => state.playlistModal)
  const dispatch = useDispatch()
  return (
        <div className='landingContainer'>
            <div className='pageContainer'>
                Playlists
                {isOpen && <PlaylistModal/>}
                <div className='playlistContainer'>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((box) => {
                      return <Playlist key={box}/>
                    })}
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
