import axios from './index'

export const getOrderList = ({ query, pagenum, pagesize }) => {
  return axios.get(`/orders?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
}

export const EditOrder = ({ order_id, order_price, pay_status, is_send }) => {
  return axios.put(`/orders/${order_id}`, {
    order_price,
    pay_status,
    is_send
  })
}