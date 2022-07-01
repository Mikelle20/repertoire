/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../features/PlaylistModalSlice'
import { motion } from 'framer-motion'

function PlaylistModal () {
  const dispatch = useDispatch()
  const user = JSON.parse(window.localStorage.getItem('user'))
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    isPrivate: false,
    accessList: []
  })

  const handleChange = (e) => {
    setFormData(prevState => {
      const { value, name, type, checked } = e.target
      return {
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(closeModal())
    axios({
      method: 'POST',
      url: 'http://localhost:5000/playlist/createPlaylist',
      withCredentials: true,
      data: { formData, user }
    })
  }
  return (
    <div className='playlistModal'>
      <form
      onSubmit={handleSubmit}
      className='playlistModalForm'>
        <div className='inputModalContainer'>
          <input
          name='title'
          placeholder='Title'
          value={formData.title}
          onChange={handleChange}
          className='authInput'>
          </input>
        </div>
        <div className='inputModalContainer'>
          <input
          name='description'
          placeholder='Description'
          value={formData.description}
          onChange={handleChange}
          className='authInput'>
          </input>
        </div>
        <div className='isPrivateContainer'>
          <input type='checkbox'
          id='isPrivate'
          name='isPrivate'
          checked={formData.isPrivate}
          onChange={handleChange}
          ></input>
          <label htmlFor='isPrivate'>Private?</label>
        </div>
        <div className='modalButtonContainer'>
          <motion.button
          whileTap={{ scale: 0.9 }}
          className='modalBtn'
          onClick={() => dispatch(closeModal())}
          >Close</motion.button>
          <motion.button
          whileTap={{ scale: 0.9 }}
          onSubmit={handleSubmit}
          id='modalClose'
          className='modalBtn'
          >Create</motion.button>
        </div>
      </form>
    </div>
  )
}

export default PlaylistModal
