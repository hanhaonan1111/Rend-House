import axios from "axios";
import {getToken, hasToken} from "@/utils/storage";

export let BASE_URL = 'http://127.0.0.1:8080'
let http = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
})

http.interceptors.request.use(config => {
    if (hasToken()) {
        config.headers.authorization = '' + getToken()
    }
    return config
})
http.interceptors.response.use(response => {
    return response.data
}, error => {
    console.log(error.data)
})
export default http