/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import FriendResult from './FriendResult'
import { setError } from '../../features/errorSlice'
import { useDispatch, useSelector } from 'react-redux'

function FriendSearchBar () {
  const [formData, setFormData] = React.useState({
    search: ''
  })

  const accessToken = window.sessionStorage.getItem('accessToken')
  const { error } = useSelector(store => store.error)
  const dispatch = useDispatch()

  const headers = {
    Authorization: `Bearer ${accessToken}`
  }

  const [friendsResults, setFriendsResults] = React.useState([])
  const [updateStatus, setUpdateStatus] = React.useState(false)

  const handleSubmit = (id) => {
    axios.post('http://localhost:5000/friends/addFriend',
      { friend: id }, { withCredentials: true, headers }).then(res => {
      setUpdateStatus(prev => {
        return !prev
      }).catch(res => {
        dispatch(setError(true))
      })
    })
  }

  const handleDelete = (id) => {
    axios({
      method: 'DELETE',
      url: 'http://localhost:5000/friends/deleteFriend',
      withCredentials: true,
      headers,
      data: { friend: id }
    }).then(res => {
      setUpdateStatus(prev => {
        return !prev
      })
    }).catch(res => {
      dispatch(setError(true))
    })
  }

  React.useEffect(() => {
    if (formData.search.length) {
      axios.post('http://localhost:5000/friends/searchFriends', formData, { withCredentials: true, headers }).then(res => {
        setFriendsResults(res.data)
      }).catch(res => {
        dispatch(setError(true))
      })
    }
  }, [formData.search, updateStatus])

  const handleChange = (Event) => {
    setFormData(prevState => {
      return {
        ...prevState,
        [Event.target.name]: Event.target.value
      }
    })
  }

  const searches = friendsResults.map(friend => {
    return <FriendResult key={friend.user_id} friend={friend} addFriend={handleSubmit} deleteFriend={handleDelete} />
  })
  return (
    <>
      {error.isError
        ? <div className='pageContainer'>
          <div className='loadingScreen'>
            {error.error}
          </div>
        </div>
        : <div className='searchContainer'>
          <div className='searchInputContainer'>
              <input
              className='searchInput'
              name='search'
              placeholder='Enter Spotify Username...'
              value={formData.search}
              onChange={handleChange}
              >
              </input>
              <span>
              <img src={require('../../assets/icons/search.png')} className='searchIcon'></img>
              </span>
          </div>
          {formData.search.length !== 0 &&
              <div className='friendResultsContainer'>
                  {searches.length === 0 ? <span className='noResultsText'>No Results Found</span> : searches}
              </div>}
      </div>}
    </>
  )
}

export default FriendSearchBar
