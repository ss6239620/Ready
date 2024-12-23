import axios from 'axios';
import { API_URL } from '../constant';

const api = axios.create({
    baseURL: `${API_URL}/chat`,
    withCredentials: true,
});


const createChatRoom = (user_id, message) => api.post(`/createchatroom`, {
    user_id: user_id,
    message: message,
});

const chatRoomExist = (user_id) => api.get(`/chatroomexist/${user_id}`);

const getAllUserChatRoom = () => api.get(`/getalluserchatrooms`);

const getAllChatroomMessages = (room_id) => api.get(`/getallmessage/${room_id}`);

const getChatRoomDetails = (room_id) => api.get(`/getchatroomdetails/${room_id}`);

const sendChatRoomMessage = (room_id, message) => api.post(`/sendmessage`, {
    room_id: room_id,
    message: message,
});


export { createChatRoom, chatRoomExist, getAllUserChatRoom, getAllChatroomMessages, sendChatRoomMessage,getChatRoomDetails }
