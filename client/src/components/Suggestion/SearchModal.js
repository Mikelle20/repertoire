/* eslint-disable no-unused-vars */
/* eslint-disable import/no-absolute-path */
import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFriends } from '../../features/friendsSlice'
import { closeModal } from '../../features/searchModalSlice'
import SearchFriends from './SearchFriends'
import explicitPng from '/Users/ambarreinoso/Desktop/projects/repertoire/client/src/assets/icons/explicit.png'
function SearchModal () {
  const { search } = useSelector(store => store.searchModal)
  const { friends } = useSelector(store => store.friends)
  const dispatch = useDispatch()

  const user = JSON.parse(window.localStorage.getItem('user'))

  React.useEffect(() => {
    // axios({
    //   method: 'POST',
    //   url: 'http://localhost:5000/friends/getFriends',
    //   withCredentials: true,
    //   data: { user }
    // }).then(res => {
    //   dispatch(setFriends(res.data))
    //   console.log(res.data)
    // })
    console.log(friends)
  }, [])
  const friendIcons = friends.map((friend) => {
    return <SearchFriends
    key={friend.user_id}
    friend={friend}
    />
  })
  return (
    <div className='searchModal'>
        <div className='searchModalTop'>
            <img src={search.cover} className='searchModalImg'></img>
            <div className='searchModalText'>{search.title.length >= 15 ? `${search.title.split(' ').slice(0, 3).join(' ')}...` : search.title} {search.explicit && <img src={explicitPng} className='modalPng'></img>}</div>
            <div className='searchModalText'>{search.artist}</div>
        </div>
        <div className='searchModalBottom'>
            <div>
              {friendIcons}
            </div>
        </div>
        <button onClick={() => dispatch(closeModal())} className='btn'>close</button>
    </div>
  )
}

export default SearchModal
