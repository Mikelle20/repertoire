/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'

function SettingUp () {
//   const [renders, setRenders] = React.useState(0)

  React.useEffect(() => {
    const queryParams = window.location.search
    const accessCode = queryParams.match('=(.*)')[1]
    console.log('i fire once ')
    axios({
      method: 'post',
      url: 'http://localhost:5000/authorize/refresh_token',
      data: { accessCode },
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*'
      }

    }).then(() => {
      console.log('finsihed')
    }, [])
  })
  return (
    <div>SettingUp...</div>
  )
}

export default SettingUp
