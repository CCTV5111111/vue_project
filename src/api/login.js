import axios from './index'

export function loginByUsername({ username, password }) {
  return axios.post('/login', {
    username,
    password
  })
}

