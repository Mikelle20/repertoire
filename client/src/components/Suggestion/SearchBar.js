/* eslint-disable no-unused-vars */
import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setError } from '../../features/errorSlice'
import SearchResult from './SearchResult'

function SearchBar () {
  const [formData, setFormData] = React.useState({
    search: ''
  })
  const dispatch = useDispatch()
  const accessToken = JSON.parse(window.sessionStorage.getItem('accessToken')).token || null

  const headers = {
    Authorization: `Bearer ${accessToken}`
  }

  const [tracks, setTracks] = React.useState([])

  React.useEffect(() => {
    axios({
      method: 'POST',
      url: 'http://localhost:5000/suggestion/search',
      data: formData,
      withCredentials: true,
      headers
    }).then(res => {
      setTracks(res.data)
    }).catch(res => {
      dispatch(setError(true))
    })
  }, [formData.search])

  const handleChange = (Event) => {
    setFormData(prevState => {
      return {
        ...prevState,
        [Event.target.name]: Event.target.value
      }
    })
  }

  const searches = tracks.map(track => {
    return <SearchResult
      key={track.songId}
      track={track}
       />
  })
  return (
    <div className='searchContainer'>
        <div className='searchInputContainer'>
            <input
            tabIndex={0}
            className='searchInput'
            name='search'
            placeholder='Song + Artist...'
            value={formData.search}
            onChange={handleChange}
            >
            </input>
            <span>
              <img src={require('../../assets/icons/search.png')} className='searchIcon'></img>
            </span>
          </div>
          {formData.search.length !== 0 &&
            <div className='searchResultsContainer'>
                {searches.length === 0 ? <span className='noResultsText'>No Results Found</span> : searches}
            </div>}
    </div>
  )
}

export default SearchBar
