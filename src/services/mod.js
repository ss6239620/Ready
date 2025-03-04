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

export { createRule, getalltriberules, deletetriberule };