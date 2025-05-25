import axios from 'axios';
import { API_URL } from '../constant';

const api = axios.create({
    baseURL: `${API_URL}/mod`,
    withCredentials: true,
});

const createRule = (tribe_id, rule_title, rule_desc, rule_reason) => api.post(`/createtriberule`, {
    id: tribe_id,
    rule_title: rule_title,
    rule_desc: rule_desc,
    rule_reason: rule_reason
});

const getalltriberules = (tribe_id) => api.get(`/getalltriberules?id=${tribe_id}`);

const deletetriberule = (tribe_id, rule_id) => api.delete(`/deletetriberule?id=${tribe_id}&rule_id=${rule_id}`);

const banUser = (tribe_id, ban_reason, ban_user_id, mod_note, msg_to_user, ban_duration) => api.post(`/banuser`, {
    ban_reason: ban_reason,
    id: tribe_id,
    ban_user_id: ban_user_id,
    mod_note: mod_note,
    msg_to_user: msg_to_user,
    ban_duration: ban_duration,
});

const removeUserBan = (tribe_id, ban_id) => api.delete(`/removeduserban?id=${tribe_id}&ban_id=${ban_id}`);

const getBanUsers = (tribe_id, page, limit) => api.get(`/getbanuser?id=${tribe_id}&page=${page}&limit=${limit}`);


export { createRule, getalltriberules, deletetriberule, banUser, getBanUsers, removeUserBan };