import axios from 'axios';
import { API_URL } from '../constant';

const api = axios.create({
    baseURL: `${API_URL}/user`,
    withCredentials: true,
});

const googleAuth = (code) => api.get(`/oauthRegister/?code=${code}`);

const login = (email, password) => api.post(`/login`, {
    email: email,
    password: password
})

const test = () => api.get(`/test`)

const logoutService = () => api.post(`/logout`)


// const signup = (email,username, password,identity,interests) => api.post(`/signup`, {
//     email: email,
//     password: password,
//     username: username,
//     identity: identity,
//     interests: interests,
// })

const signup = (form) => api.post(`/signup`, form, {
    headers: {
        'Content-Type': 'multipart/form-data', // This is required to send form data with files
    },
})

export { googleAuth,login,signup ,test,logoutService}