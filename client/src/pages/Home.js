/* eslint-disable no-unused-vars */
import React from 'react'
import SideItem from '../components/Home/SideItem'
import SocialItem from '../components/Home/SocialItem'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { getUser } from '../features/userSlice'
import { useLocation, useNavigate } from 'react-router'
import SuggestionItem from '../components/Home/SuggestionItem'
import { getHomeData } from '../features/homeDataSlice'
import HomeContainer from '../components/Home/HomeContainer'

function Home () {
  const accessToken = window.sessionStorage.getItem('accessToken') || null
  if (!accessToken) window.location.href = '/login'
  const userRating = useSelector(store => store.user.rating)
  const { homeData } = useSelector(store => store.homeData)
  const dispatch = useDispatch()
  const user = JSON.parse(window.localStorage.getItem('user')) || JSON.parse(window.sessionStorage.getItem('user'))

  const [data, setData] = React.useState(null)
  const [socials, setSocials] = React.useState(null)

  const headers = {
    Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`
  }

  React.useEffect(() => {
    axios.get('http://localhost:5000/home/setHome', { withCredentials: true, headers }).then(res => {
      setData(res.data)
    })

    axios.get('http://localhost:5000/home/getSocials', { withCredentials: true, headers }).then(res => {
      setSocials(res.data)
    })
  }, [])

  return (
    <div className='landingContainer'>
      {accessToken && <div className='pageContainer'>
        {socials && data !== null
          ? <HomeContainer userRating={userRating} data={data} socials={socials}/>
          : <div className='loadingScreen'>
            Loading...
          </div>}
      </div>}
    </div>
  )
}

export default Home
