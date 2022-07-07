/* eslint-disable no-unused-vars */
/* eslint-disable import/no-absolute-path */
import React from 'react'
import axios from 'axios'
import searchpng from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/search.png'
import FriendResult from './FriendResult'

function FriendSearchBar () {
  const user = JSON.parse(window.localStorage.getItem('user'))
  const [formData, setFormData] = React.useState({
    user,
    search: ''
  })

  const [friendsResults, setFriendsResults] = React.useState([])

  const handleSubmit = (id) => {
    setFriendsResults((prevState) => {
      prevState.map(friend => {
        return friend.user_id === id ? { ...friend, status: friend.status + 1 } : { ...friend }
      })
    })
    axios({
      method: 'POST',
      url: 'http://localhost:5000/friends/addFriend',
      withCredentials: true,
      data: { friend: id, user }
    }).then(res => console.log(res.data))
  }

  React.useEffect(() => {
    if (formData.search.length) {
      axios({
        method: 'POST',
        url: 'http://localhost:5000/friends/searchFriends',
        data: formData,
        withCredentials: true
      }).then((res) => {
        setFriendsResults(res.data)
        console.log(friendsResults)
      })
    }
  }, [formData.search])

  const handleChange = (Event) => {
    setFormData(prevState => {
      return {
        ...prevState,
        [Event.target.name]: Event.target.value
      }
    })
  }

  const searches = friendsResults.map(friend => {
    return <FriendResult key={friend.user_id} friend={friend} addFriend={handleSubmit} />
  })
  return (
    <div className='searchContainer'>
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
            <img src={searchpng} className='searchIcon'></img>
            </span>
        </div>
        {formData.search.length !== 0 &&
            <div className='friendResultsContainer'>
                {searches.length === 0 ? <span className='noResultsText'>No Results Found</span> : searches}
            </div>}
    </div>
  )
}

export default FriendSearchBar
