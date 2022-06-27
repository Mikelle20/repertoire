/* eslint-disable no-unused-vars */
import React from 'react'
import SideItem from '../components/Home/SideItem'
import SocialItem from '../components/Home/SocialItem'
import { useSelector } from 'react-redux'

function Home () {
  let user = useSelector(store => store.user.user)
  if (!user.display_name) user = JSON.parse(window.localStorage.getItem('user'))
  const time = new Date()
  const hours = time.getHours()

  let greeting

  if (hours > 4 && hours < 12) greeting = 'Morning'
  if (hours >= 12 && hours < 18) greeting = 'Afternoon'
  if (hours <= 4 || hours >= 18) greeting = 'Evening'
  return (
    <>
      <div>Home</div>
      <div className='homeContainer'>
        <div className='leftHome'>
          <h1 className='homeTitle'><img src={user.profile_image} className='profilePic'></img>Good {greeting}, {user.display_name}</h1>
          <h2 className='homeHeader'>Your top artist</h2>
          <div className='sideScrollDiv'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((box) => {
              return <SideItem key={box}/>
            })}
          </div>
          <h1 className='homeHeader'>Suggestions from friends</h1>
          <div className='sideScrollDiv'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((box) => {
              return <SideItem key={box}/>
            })}
          </div>
          <h2 className='homeHeader'>Your Playlists</h2>
          <div className='sideScrollDiv'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((box) => {
              return <SideItem key={box}/>
            })}
          </div>
        </div>
        <div className='rightHome'>
          <div className='ratingContainer'>
            <h2 className='homeHeader'>Rating: {user.rating}</h2>
          </div>
          <div className='socialDiv'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => {
              return <SocialItem key={item}/>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
