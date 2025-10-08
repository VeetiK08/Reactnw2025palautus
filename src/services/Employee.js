import axios from "axios"

const baseUrl = "https://nwobackendveeti-and5fdh8d3hxhcan.canadacentral-01.azurewebsites.net/api/employees"

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`  // capital B
}

const getConfig = () => ({
  headers: { Authorization: token }
})

const getAll = () => {
  return axios.get(baseUrl, getConfig())
    .then(response => response.data)
}

const create = (newEmployee) => {
  return axios.post(baseUrl, newEmployee, getConfig())
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`, getConfig())
}

const update = (employee) => {
  return axios.put(`${baseUrl}/${employee.employeeId}`, employee, getConfig())
}

export default { getAll, create, remove, update, setToken }