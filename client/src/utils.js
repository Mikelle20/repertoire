import axios from 'axios'

const accessToken = window.sessionStorage.getItem('accessToken')

export const axiosAuth = axios.create({
  baseURL: 'http://localhost:5000/authorize',
  headers: { Authorization: `Bearer ${accessToken}` }
})
