import axios from './index'

export function getMenus() {
  return axios.get('/menus', {
    headers: {
      Authorization: sessionStorage.getItem('token')
    }
  })
}