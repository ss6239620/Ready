import axios from 'axios';
import { API_URL } from '../constant';

const api = axios.create({
    baseURL: `${API_URL}/post`,
    withCredentials: true,
});

const createPost = (form) => api.post(`/createpost`, form, {
    headers: {
        'Content-Type': 'multipart/form-data', // This is required to send form data with files
    },
})

const getPost = (postId) => api.get(`/getpost/${postId}`)

const getAllPostOfTribe = (id) => api.get(`/gettribePost/${id}`)

export { createPost, getAllPostOfTribe,getPost }
