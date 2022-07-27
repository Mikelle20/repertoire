import React from 'react'
import SearchBar from '../components/Suggestion/SearchBar'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setFriends } from '../features/friendsSlice'
import SearchModal from '../components/Suggestion/SearchModal'
import { setError } from '../features/errorSlice'

function Suggestion () {
  const accessToken = JSON.parse(window.sessionStorage.getItem('accessToken')).token || null
  if (!accessToken) window.location.href = '/login'

  const { isOpen } = useSelector(store => store.searchModal)
  const { error } = useSelector(store => store.error)
  const dispatch = useDispatch()

  const headers = {
    Authorization: `Bearer ${accessToken}`
  }

  React.useEffect(() => {
    axios.get(
      '/friends/getFriends',
      { withCredentials: true, headers }
    ).then(res => {
      dispatch(setFriends(res.data))
    }).catch(res => dispatch(setError(true)))
  }, [])
  return (
    <div className='landingContainer'>
        {error.isError
          ? <div className='loadingScreen'>{error.error}</div>
          : <div className='pageContainer'>
            {isOpen && <SearchModal/>}
            <SearchBar />
        </div>}
    </div>
  )
}

export default Suggestion
