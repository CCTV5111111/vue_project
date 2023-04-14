import axios from './index'

export const getGoodsList = ({ query, pagenum, pagesize }) => {
  return axios.get(`/goods?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
}

export const searchGoods = (id) => {
  return axios.get(`/goods/${id}`)
}

export const deleteGoods = (id) => {
  return axios.delete(`/goods/${id}`)
}

export const editGoods = (id, { goods_name, goods_price, goods_number, goods_weight, goods_cat }) => {
  return axios.put(`/goods/${id}`, {
    goods_name,
    goods_price,
    goods_number,
    goods_weight,
    goods_cat
  })
}