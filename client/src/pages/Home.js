/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import HomeContainer from '../components/Home/HomeContainer'

function Home () {
  const accessToken = window.sessionStorage.getItem('accessToken') || null
  if (!accessToken) window.location.href = '/login'

  const [data, setData] = React.useState(null)
  const [socials, setSocials] = React.useState(null)
  const [error, setError] = React.useState({
    isError: false,
    error: ''
  })

  const headers = {
    Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`
  }

  React.useEffect(() => {
    axios.get('http://localhost:5000/home/setHome', { withCredentials: true, headers }).then(res => {
      setData(res.data)
    }).catch(res => {
      setError({
        isError: true,
        error: 'Internal Server Error.'
      })
    })

    axios.get('http://localhost:5000/home/getSocials', { withCredentials: true, headers }).then(res => {
      setSocials(res.data)
    }).catch(res => {
      setError({
        isError: true,
        error: 'Internal Server Error.'
      })
    })
  }, [])

  return (
    <div className='landingContainer'>
      {accessToken && <div className='pageContainer'>
        {socials && data !== null
          ? <HomeContainer data={data} socials={socials}/>
          : <div className='loadingScreen'>
            {error.isError ? error.error : 'Loading...'}
          </div>}
      </div>}
    </div>
  )
}

export default Home
