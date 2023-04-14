import axios from './index'

export const getcategorieList = () => {
  return axios.get('/categories')
}

/**
 * 获取商品参数面板数据
 * @param {*} id 分类id
 * @param {*} sel 选择参数类型
**/

export const getAttributes = (id) => {
  return axios.get(`/categories/${id}/attributes?sel=many`)
}

export const getAttributes2 = (id) => {
  return axios.get(`/categories/${id}/attributes?sel=only`)
}

export const commitGoods = (data) => {
  return axios.post('/goods', data)
}

export const getReports = () => {
  return axios.get('/reports/type/1')
}
