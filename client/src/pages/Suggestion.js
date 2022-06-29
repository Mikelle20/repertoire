import React from 'react'
import SearchBar from '../components/Suggestion/SearchBar'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setFriends } from '../features/friendsSlice'
import SearchModal from '../components/Suggestion/SearchModal'
function Suggestion () {
  const { isOpen } = useSelector(store => store.searchModal)
  const dispatch = useDispatch()

  const user = JSON.parse(window.localStorage.getItem('user'))

  React.useEffect(() => {
    axios({
      method: 'POST',
      url: 'http://localhost:5000/friends/getFriends',
      withCredentials: true,
      data: { user }
    }).then(res => {
      dispatch(setFriends(res.data))
      console.log(res.data)
    })
  }, [])
  return (
    <div className='landingContainer'>
        <div className='pageContainer'>
            Suggestion
            {isOpen && <SearchModal/>}
            <SearchBar />
        </div>
    </div>
  )
}

export default Suggestion
