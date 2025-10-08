import axios from "axios"

const baseUrl ="https://nwobackendveeti-and5fdh8d3hxhcan.canadacentral-01.azurewebsites.net/api/products"
// const baseUrl = "https://nwbackendsimo.azurewebsites.net/api/products"


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newProduct => {
    return axios.post(baseUrl, newProduct)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}                               

const update = (object) => {
    return axios.put(`${baseUrl}/${object.productId}`, object)
}


export default { getAll, create, remove, update }