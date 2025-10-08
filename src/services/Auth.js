import axios from 'axios'
import API_BASE from "../utils/apiBase";

const url = `${API_BASE}/authentication`

const authenticate = (userForAuth) => {
    const request = axios.post(url, userForAuth)
    return request.then(response => response)
}

export default { authenticate }