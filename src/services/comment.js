import axios from 'axios';
import { API_URL } from '../constant';

const api = axios.create({
    baseURL: `${API_URL}/comment`,
    withCredentials: true,
});

const getAllPostComment = (post_id, page) => api.get(`/getcomment/?id=${post_id}&page=${page}&limit=${5}`);

const getAllUserComment = (page) => api.get(`/allusercomment?page=${page}&limit=${5}`);

const searchComments = (q, page) => api.get(`/searchcomment/?q=${q}&page=${page}&limit=${5}`);

const postComment = (comment_text, post_id) => api.post(`/postcomment`, {
    comment_text: comment_text,
    post_id: post_id
})

const replyToComment = (comment_text, comment_id,post_id) => api.post(`/replytocomment`, {
    comment_text: comment_text,
    comment_id: comment_id,
    post_id:post_id
})

export { getAllPostComment, getAllUserComment, postComment, replyToComment, searchComments }