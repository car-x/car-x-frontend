import axios from 'axios'

// For Production
// const API = axios.create({
//   baseURL: 'https://car-x-backend.herokuapp.com/',
// })

// For Development

const API = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/' : 'https://car-x-backend.herokuapp.com/',
})

API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token
      }`
  }
  return req
})

export const getDatas = (APIkey) => API.post('/data/fetch', APIkey);
export const getArduinoControl = (APIkey) => API.post('/control/fetch', APIkey);
export const postControl = (formData) => API.post('/control', formData);
export const getNotification = (APIkey) => API.post('/notification/fetch', APIkey);

export const login = (formData) => API.post('/login', formData);

export const getAccounts = (formData) => API.post('/accounts/fetch', formData);
export const accountTypeChnage = (formData) => API.post('/accounts/change', formData);
export const accountCreate = (formData) => API.post('/accounts/create', formData);

export const profileUpdate = (formData) => API.post('/profile/update', formData);