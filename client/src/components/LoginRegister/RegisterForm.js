import React from 'react'
import axios from 'axios'

function RegisterForm () {
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
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
    // console.log(formData)

    axios({
      method: 'post',
      url: '/authorize/register/',
      data: formData,
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*'
      }

    }).then((res) => {
    //   const { userCreated } = res.data
      if (res) {
        const scopes = 'user-read-currently-playing playlist-modify-public user-library-modify playlist-modify-private playlist-read-collaborative playlist-read-private'
        const authorizeEndpoint = 'https://accounts.spotify.com/authorize?'

        const authObject = {
          response_type: 'code',
          client_id: '87b59a7fa8cf4a0b85c227afc162a118',
          scope: scopes,
          redirect_uri: 'http://localhost:3000/login',
          show_dialog: true
        }
        const authQueryString = new URLSearchParams(authObject).toString()
        window.location.href = authorizeEndpoint + authQueryString
      }
    })
  }
  return (
    <>
      <div>
       <form onSubmit={handleSubmit}>
            <input
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            >
            </input>
            <input
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            >
            </input>
            <button>Submit</button>
       </form>
      </div>
    </>

  )
}

export default RegisterForm
