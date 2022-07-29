/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import HomeContainer from '../components/Home/HomeContainer'

function Home () {
  const accessToken = JSON.parse(window.sessionStorage.getItem('accessToken')) || null
  if (!accessToken) window.location.href = '/login'

  const [data, setData] = React.useState(null)
  const [socials, setSocials] = React.useState(null)
  const [error, setError] = React.useState({
    isError: false,
    error: ''
  })

  const headers = {
    Authorization: `Bearer ${accessToken.token}`
  }

  React.useEffect(() => {
    axios.get('/home/setHome', { withCredentials: true, headers }).then(res => {
      setData(res.data)
    }).catch(res => {
      setError({
        isError: true,
        error: '(500) Internal Server Error.'
      })
    })

    axios.get('/home/getSocials', { withCredentials: true, headers }).then(res => {
      setSocials(res.data)
    }).catch(res => {
      setError({
        isError: true,
        error: '(500) Internal Server Error.'
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
