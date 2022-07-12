/* eslint-disable no-unused-vars */
import React from 'react'
import SideItem from '../components/Home/SideItem'
import SocialItem from '../components/Home/SocialItem'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { getUser } from '../features/userSlice'
import { useLocation } from 'react-router'
import SuggestionItem from '../components/Home/SuggestionItem'
import { getHomeData } from '../features/homeDataSlice'
import HomeContainer from '../components/Home/HomeContainer'

function Home () {
  const userRating = useSelector(store => store.user.rating)
  const { homeData } = useSelector(store => store.homeData)
  const dispatch = useDispatch()
  const user = JSON.parse(window.localStorage.getItem('user')) || JSON.parse(window.sessionStorage.getItem('user'))
  const time = new Date()
  const hours = time.getHours()

  let greeting

  if (hours > 4 && hours < 12) greeting = 'Morning'
  if (hours >= 12 && hours < 18) greeting = 'Afternoon'
  if (hours <= 4 || hours >= 18) greeting = 'Evening'

  const [data, setData] = React.useState(null)
  const [socials, setSocials] = React.useState(null)

  React.useEffect(() => {
    axios({
      method: 'POST',
      url: 'http://localhost:5000/home/setHome',
      data: { user },
      withCredentials: true
    }).then(res => {
      setData(res.data)
    })

    axios({
      method: 'POST',
      url: 'http://localhost:5000/home/getSocials',
      data: { user },
      withCredentials: true
    }).then(res => {
      setSocials(res.data)
    })
    dispatch(getUser(user.email))
  }, [])

  return (
    <div className='landingContainer'>
      <div className='pageContainer'>
        <div>Home</div>
        {data && <HomeContainer userRating={userRating} user={user} data={data} socials={socials}/>}
      </div>
    </div>
  )
}

export default Home
