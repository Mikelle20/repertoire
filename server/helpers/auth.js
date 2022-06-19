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

const setAccount = async (accessCode, email) => {
  let accountSet
  await axios({
    method: 'POST',
    url: 'http://localhost:5000/authorize/refresh_token',
    data: {
      accessCode,
      email
    }
  }).then((res) => {
    accountSet = res.data
  })
  return accountSet
}

module.exports = {
  getAccess,
  setAccount
}
