/* eslint-disable no-unused-vars */
import axios from 'axios'

const urlIn = "http://localhost:3333/"
const urlOut = "http://192.168.1.7:3333/"
const inLive = "https://backend-josy-vite-rest.onrender.com/"

const api = axios.create({
  baseURL: urlIn
})

export default api;
