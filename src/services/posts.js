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

const getPost = (postId) => api.get(`/getpost/${postId}`);

const getAllUserPosts = (page) => api.get(`/alluserpost?page=${page}&limit=${5}`);

const getAllPostOfTribe = (id) => api.get(`/gettribePost/${id}`)

const getHomeFeed = (page, limit) => api.get(`/homefeed`, {
    params: { page, limit }
})

const getRecentPost = () => api.get(`/recentpost`)

const getTrendingTodayPost = () => api.get(`/trendingtoday`)

const searchPost = (q, page) => api.get(`/searchpost?q=${q}&page=${page}&limit=${5}`);

const makeVote = (post_id, vote) => api.post(`/postvote`, {
    vote: vote,
    post_id: post_id
})

export { createPost, getAllPostOfTribe, getAllUserPosts, getPost, getHomeFeed, makeVote, getRecentPost, getTrendingTodayPost, searchPost }
