import axios from 'axios';
import { API_URL } from '../constant';

const api = axios.create({
    baseURL: `${API_URL}/comment`,
    withCredentials: true,
});

const getAllPostComment = (post_id) => api.get(`/comments/${post_id}`);

const postComment = (comment_text, post_id) => api.post(`/postcomment`, {
    comment_text: comment_text,
    post_id: post_id
})

const replyToComment = (comment_text, comment_id) => api.post(`/replytocomment`, {
    comment_text: comment_text,
    comment_id: comment_id
})

export { getAllPostComment, postComment,replyToComment }