import axios from 'axios';
import { API_URL } from '../constant';

const api = axios.create({
    baseURL: `${API_URL}/tribe`,
    withCredentials: true,
});

// const googleAuth = (code) => api.get(`/oauthRegister/?code=${code}`);

const createTribe = (form) => api.post(`/createtribe`, form, {
    headers: {
        'Content-Type': 'multipart/form-data', // This is required to send form data with files
    },
})

const getAllJoinedTribe = () => api.get(`/getalljoinedtribe`);

const getAllTribe = () => api.get(`/getalltribe`);

const recommendedSearch = (q,page) => api.get(`/recommendedsearch?q=${q}&page=${page}&limit=${5}`);

const isJoinedTribe = (id) => api.get(`/isjoinedtribe/${id}`);

const getTribeDetails = (id) => api.get(`/gettribedetails/${id}`);

const joinTribe = (tribeid) => api.post(`/jointribe`, {
    tribeid: tribeid
})

const leaveTribe = (tribeid) => api.post(`/leavetribe`, {
    tribeid: tribeid
})

export { createTribe, getAllJoinedTribe, getTribeDetails, joinTribe, isJoinedTribe, getAllTribe, leaveTribe, recommendedSearch }