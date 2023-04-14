import axios from './index'


export function getUserList(pagenum, pagesize, query) {
  return axios.get(`/users?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
}

export function changeUser(uId, type) {
  return axios.put(`/users/${uId}/state/${type}`)
}

export function editUser(id, email, mobile) {
  return axios.put(`/users/${id}`, {
    email,
    mobile
  })
}

export function addUser({ username, password, email, mobile }) {
  return axios.post(`/users`, {
    username,
    password,
    email,
    mobile
  })
}

export function deleteUser(id) {
  return axios.delete(`/users/${id}`)
}

export function allocationUser(id, rid) {
  return axios.put(`/users/${id}/role`, {
    rid
  })
}