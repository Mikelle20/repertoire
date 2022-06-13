import React from 'react'
import axios from 'axios'

function LoginForm () {
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })

  const queryParams = window.location.search || null
  const accessCode = queryParams.match('=(.*)')[1]

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

    if (queryParams) {
      axios({
        method: 'POST',
        url: 'http://localhost:5000/authorize/passport',
        data: { ...formData, accessCode }
      }).then((res) => {
        console.log(res)
      })
    } else {
      console.log('query params not present')
    }
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

export default LoginForm
