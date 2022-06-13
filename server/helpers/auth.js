const { default: axios } = require('axios')

const getAccess = async (refreshToken) => {
  // console.log('2', refreshToken)
  const accessToken = await axios({
    method: 'POST',
    url: 'http://localhost:5000/authorize/access_token',
    data: { refreshToken }
  })

  return accessToken.data.accessToken
}

const setAccount = (accessCode, email) => {
  axios({
    method: 'POST',
    url: 'http://localhost:5000/authorize/refresh_token',
    data: {
      accessCode,
      email
    }
  })
}

module.exports = {
  getAccess,
  setAccount
}
