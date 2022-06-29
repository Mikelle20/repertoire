/* eslint-disable import/no-absolute-path */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import React from 'react'
import SearchResult from './SearchResult'
import searchpng from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/search.png'

function SearchBar () {
  const user = JSON.parse(window.localStorage.getItem('user'))
  const [formData, setFormData] = React.useState({
    user,
    search: ''
  })

  const [tracks, setTracks] = React.useState([])

  React.useEffect(() => {
    axios({
      method: 'POST',
      url: 'http://localhost:5000/suggestion/search',
      data: formData,
      withCredentials: true
    }).then((res) => {
      setTracks(res.data)
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
            className='searchInput'
            name='search'
            placeholder='Song + Artist...'
            value={formData.search}
            onChange={handleChange}
            >
            </input>
            <span>
              <img src={searchpng} className='searchIcon'></img>
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
