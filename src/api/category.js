import axios from './index'

export const getCategory = ({ pagenum, pagesize }) => {
  return axios.get(`/categories/?&pagenum=${pagenum}&pagesize=${pagesize}`)
}

export const getCategoriesList = () => {
  return axios.get('/categories?type=2')
}

export const addCategory = ({ cat_pid, cat_name, cat_level }) => {
  return axios.post('/categories', {
    cat_pid,
    cat_name,
    cat_level
  })
}

export const editCategory = ({ cat_id, cat_name }) => {
  return axios.put(`/categories/${cat_id}`, {
    cat_name
  })
}

export const deleteCategory = (cat_id) => {
  return axios.delete(`/categories/${cat_id}`)
}