/* eslint-disable no-unused-vars */
import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { closeModal } from '../../features/searchModalSlice'
import SearchFriends from './SearchFriends'
import FriendPlaylist from './FriendPlaylist'
import { setError } from '../../features/errorSlice'
function SearchModal () {
  const { search } = useSelector(store => store.searchModal)
  const { friends } = useSelector(store => store.friends)
  const dispatch = useDispatch()

  const accessToken = JSON.parse(window.sessionStorage.getItem('accessToken')).token || null
  const headers = {
    Authorization: `Bearer ${accessToken}`
  }

  const [formData, setFormData] = React.useState({
    song_id: search.songId,
    friend_id: '',
    playlist_id: ''
  })

  const [friendPlaylists, setFriendPlaylists] = React.useState([])

  const [modalFriends, setModalFriends] = React.useState(friends)

  React.useEffect(() => {
    if (formData.friend_id) {
      axios({
        method: 'POST',
        url: '/suggestion/accessedPlaylists',
        withCredentials: true,
        headers,
        data: { friend: formData.friend_id }
      }).then(res => {
        setFriendPlaylists(res.data)
      }).catch(res => {
        dispatch(setError(true))
      })
    }
  }, [formData.friend_id])

  const handleClick = (id) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        friend_id: prevState.friend_id === id ? '' : id
      }
    })

    setModalFriends((prevState) => {
      return prevState.map((friend) => {
        return friend.user_id === id ? { ...friend, checked: !friend.checked } : { ...friend, checked: false }
      })
    })
  }

  const selectPlaylist = (id) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        playlist_id: prevState.playlist_id === id ? '' : id
      }
    })

    setFriendPlaylists((prevState) => {
      return prevState.map((playlist) => {
        return playlist.playlistId === id ? { ...playlist, checked: !playlist.checked } : { ...playlist, checked: false }
      })
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios({
      method: 'POST',
      url: '/suggestion/suggest',
      withCredentials: true,
      headers,
      data: { ...formData }
    }).then(res => {
      dispatch(closeModal())
    }).catch(res => {
      dispatch(setError(true))
    })
  }

  const friendIcons = modalFriends.map((friend) => {
    return <SearchFriends
      key={friend.user_id}
      friend={friend}
      handleClick={handleClick}
    />
  })

  const friendPlaylistIcons = friendPlaylists.map(element => {
    return <FriendPlaylist
      key={element.playlistId}
      playlist={element}
      selectPlaylist={selectPlaylist}
      />
  })
  return (
    <motion.div
    drag
    dragSnapToOrigin
    className='searchModal'>
        <div className='searchModalTop'>
            <img src={search.cover} className='searchModalImg'></img>
            <div className='searchModalText'>{search.title.length >= 15 ? `${search.title.split(' ').slice(0, 3).join(' ')}...` : search.title} {search.explicit && <img src={require('../../assets/icons/explicit.png')} className='modalPng'></img>}</div>
            <div className='searchModalText'>{search.artist}</div>
        </div>
        <div className='searchModalBottom'>
            <div className='modalFriends'>
              {friendIcons}
            </div>
        </div>
        {formData.friend_id &&
          <div className='modalFriendsPlaylists'>
            {friendPlaylistIcons.length === 0 ? <span className='empty'>No Playlists Yet</span> : friendPlaylistIcons}
          </div>
        }
        <div className='buttonModalContainer'>
          <motion.button
          tabIndex={0}
          style={{ marginRight: '20%' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => dispatch(closeModal())} className='modalBtn'>
            Close
          </motion.button>
          {formData.playlist_id && <motion.button
          tabIndex={0}
          whileTap={{ scale: 0.9 }}
          onClick={handleSubmit} className='modalBtn'>
            Add
          </motion.button>}
         </div>
    </motion.div>
  )
}

export default SearchModal
