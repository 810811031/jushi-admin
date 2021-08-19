import axios from 'axios'

export function Login (param) {
    return axios.post('/manage/login', param)
}