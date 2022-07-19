/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../features/PlaylistModalSlice'
import { motion } from 'framer-motion'
import SearchFriends from '../Suggestion/SearchFriends'
import { setError } from '../../features/errorSlice'

function PlaylistModal (props) {
  const dispatch = useDispatch()
  const accessToken = window.sessionStorage.getItem('accessToken')
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    isPrivate: false,
    accessList: []
  })

  const headers = {
    Authorization: `Bearer ${accessToken}`
  }

  const [searchFriends, setSearchFriends] = React.useState(props.friends)

  React.useEffect(() => {
    if (!formData.isPrivate) {
      setFormData((prevState) => {
        return {
          ...prevState,
          accessList: []
        }
      })
    }
  }, [formData.isPrivate])

  const handleChange = (e) => {
    setFormData(prevState => {
      const { value, name, type, checked } = e.target
      return {
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(closeModal())
    await axios({
      method: 'POST',
      url: 'http://localhost:5000/playlist/createPlaylist',
      withCredentials: true,
      headers,
      data: { formData }
    }).catch(res => {
      dispatch(setError(true))
    })
    props.renderPlaylists()
  }

  const handleClick = (id) => {
    const idExists = formData.accessList.includes(id)

    if (idExists) {
      setFormData((prevState) => {
        const newList = prevState.accessList.filter(element => element !== id)
        return {
          ...prevState,
          accessList: newList
        }
      })
    } else {
      setFormData((prevState) => {
        return {
          ...prevState,
          accessList: [...formData.accessList, id]
        }
      })
    }

    setSearchFriends((prevState) => {
      return prevState.map((friend) => {
        return friend.user_id === id ? { ...friend, checked: !friend.checked } : friend
      })
    })
  }

  const friendIcons = searchFriends.map((friend) => {
    return <SearchFriends
      key={friend.user_id}
      friend={friend}
      handleClick={handleClick}
    />
  })
  return (
    <motion.div
    drag
    dragSnapToOrigin
    className='playlistModal'>
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
        {formData.isPrivate &&
          <div className='modalFriends'>
            {friendIcons}
          </div>
        }
        <div className='modalButtonContainer'>
          <motion.button
          whileTap={{ scale: 0.9 }}
          className='modalBtn'
          onClick={() => dispatch(closeModal())}
          >Close</motion.button>
          {formData.title && <motion.button
          whileTap={{ scale: 0.9 }}
          onSubmit={handleSubmit}
          id='modalClose'
          className='modalBtn'
          >Create</motion.button>}
        </div>
      </form>
    </motion.div>
  )
}

export default PlaylistModal
