import axios from "axios"
import API_BASE from "../utils/apiBase";

const baseUrl = `${API_BASE}/customers`

let token = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  localStorage.setItem("token", newToken)
}

const getConfig = () => ({
  headers: { Authorization: token }
})

const getAll = () => axios.get(baseUrl, getConfig()).then(res => res.data)
const create = newCustomer => axios.post(baseUrl, newCustomer, getConfig())
const remove = id => axios.delete(`${baseUrl}/${id}`, getConfig())
const update = newCustomer => axios.put(`${baseUrl}/${newCustomer.customerId}`, newCustomer, getConfig())

export default { getAll, create, remove, update, setToken }