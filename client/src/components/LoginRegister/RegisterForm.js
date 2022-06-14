import React from 'react'
import axios from 'axios'

function RegisterForm () {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (Event) => {
    setFormData(prevState => {
      return {
        ...prevState,
        [Event.target.name]: Event.target.value
      }
    })
  }

  const handleSubmit = (Event) => {
    Event.preventDefault()
    if (formData.password === formData.confirmPassword) {
      axios({
        method: 'post',
        url: '/authorize/register/',
        data: formData,
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*'
        }

      }).then((res) => {
        if (res) {
          const scopes = 'user-read-currently-playing playlist-modify-public user-library-modify playlist-modify-private playlist-read-collaborative playlist-read-private'
          const authorizeEndpoint = 'https://accounts.spotify.com/authorize?'

          const authObject = {
            response_type: 'code',
            client_id: process.env.REACT_APP_CLIENT_ID,
            scope: scopes,
            redirect_uri: process.env.REACT_APP_REDIRECT_URI,
            show_dialog: true
          }
          const authQueryString = new URLSearchParams(authObject).toString()
          window.location.href = authorizeEndpoint + authQueryString
        }
      })
    } else { console.log('passwords must match') }
  }
  return (
    <>
      <div className='authContainer'>
       <form
       className='authForm'
       onSubmit={handleSubmit}>
            <input
            className='authInput'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            >
            </input>
            <input
            className='authInput'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            >
            </input>
            <input
            className='authInput'
            name='confirmPassword'
            placeholder='Confirm Password'
            value={formData.confirmPassword}
            onChange={handleChange}
            >
            </input>
            <button className='btn'>Submit</button>
       </form>
      </div>
    </>

  )
}

export default RegisterForm
