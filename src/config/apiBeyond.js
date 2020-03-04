import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BASEURL_BEYOND,
    timeout: 20000
})

export default api;