/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const accessToken = window.sessionStorage.getItem('accessToken');

export const axiosAuth = axios.create({
  baseURL: 'https://repertoireapp.herokuapp.com/authorize',
  headers: { Authorization: `Bearer ${accessToken}` },
});
