import axios from 'axios'

const url = "https://nwobackendveeti-and5fdh8d3hxhcan.canadacentral-01.azurewebsites.net/api/authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(url, userForAuth)
    return request.then(response => response)
}

export default { authenticate }