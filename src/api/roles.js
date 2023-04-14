import axios from './index'

export const getRolesList = () => {
  return axios({
    url: 'roles'
  })
}

export const editRole = (id, roleName, roleDesc) => {
  return axios.put(`roles/${id}`, {
    roleName,
    roleDesc
  })
}

export const deleteRole = (id) => {
  return axios.delete(`roles/${id}`)
}

export const getrightsList = (type) => {
  return axios.get(`rights/${type}`)
}

export const addRole = (roleName, roleDesc) => {
  return axios({
    url: 'roles',
    method: 'post',
    data: {
      roleName,
      roleDesc
    }
  })
}

export const impowerRole = (roleId, rids) => {
  return axios.post(`roles/${roleId}/rights`, {
    rids
  })
}

export const deleteRoleRight = ({ roleId, rightId }) => {
  return axios.delete(`roles/${roleId}/rights/${rightId}`)
}