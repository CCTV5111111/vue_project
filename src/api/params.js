import axios from './index'

export const EditParamsMany = (id, attrId, attr_name, attr_vals) => {
  return axios.put(`categories/${id}/attributes/${attrId}`, {
    attr_name,
    attr_sel: 'many',
    attr_vals
  })
}

export const EditParamsOnly = (id, attrId, attr_name, attr_vals) => {
  return axios.put(`categories/${id}/attributes/${attrId}`, {
    attr_name,
    attr_sel: 'only',
    attr_vals
  })
}

export const DeleteParamsMany = (id, attrId) => {
  return axios.delete(`categories/${id}/attributes/${attrId}`)
}

export const AddMany = (id, { attr_name, attr_sel }) => {
  return axios.post(`categories/${id}/attributes`, {
    attr_name,
    attr_sel
  })
}