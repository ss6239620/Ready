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

const updateUserBan = (tribe_id, ban_reason, ban_id, mod_note, msg_to_user, ban_duration) => api.patch(`/updateuserban`, {
    ban_reason: ban_reason,
    id: tribe_id,
    ban_id: ban_id,
    mod_note: mod_note,
    msg_to_user: msg_to_user,
    ban_duration: ban_duration,
});

const removeUserBan = (tribe_id, ban_id) => api.delete(`/removeduserban?id=${tribe_id}&ban_id=${ban_id}`);

const getBanUsers = (tribe_id, page, limit) => api.get(`/getbanuser?id=${tribe_id}&page=${page}&limit=${limit}`);

const searchBanUsers = (tribe_id, query, restrict_type) => api.get(`/searchbanusers?id=${tribe_id}&q=${query}&restriction_type=${restrict_type}`);

const muteUser = (tribe_id, mute_user_id, mod_note, mute_duration) => api.post(`/muteuser`, {
    id: tribe_id,
    mute_user_id: mute_user_id,
    mod_note: mod_note,
    mute_duration: mute_duration,
});

const getMutedUsers = (tribe_id, page, limit) => api.get(`/getmuteduser?id=${tribe_id}&page=${page}&limit=${limit}`);

const inviteMembers = (tribe_id, user_id, permissions) => api.post(`/invitemember`, {
    id: tribe_id,
    user_id: user_id,
    permissions: permissions
});

const removeUserInvite = (tribe_id, member_id) => api.delete(`/deleteinvite?id=${tribe_id}&member_id=${member_id}`);

const getAllModerators = (tribe_id, page, limit) => api.get(`/getalltribemoderators?id=${tribe_id}&page=${page}&limit=${limit}`);

const approveMember = (tribe_id, user_id) => api.post(`/approveuser`, {
    id: tribe_id,
    user_id: user_id,
});

const removeApprovedUser = (tribe_id, member_id) => api.delete(`/deleteapproveduser?id=${tribe_id}&member_id=${member_id}`);

const getAllApprovedMembers = (tribe_id, page, limit) => api.get(`/getallapprovemembers?id=${tribe_id}&page=${page}&limit=${limit}`);

const getAlltribeInvite = (tribe_id, page, limit) => api.get(`/getAlltribeInvite?id=${tribe_id}&page=${page}&limit=${limit}`);

const getAllModQueuePosts = (tribe_id, page, limit, status = "UNMODERATED") => api.get(`/getallmodqueueposts?id=${tribe_id}&page=${page}&limit=${limit}&status=${status}`);

const updateUnModeratedPostStatus = (tribe_id, post_id, post_action) => api.patch(`/updateunmoderatedpost`, {
    id: tribe_id,
    post_id: post_id,
    post_action: post_action
});

export { createRule, getAllModerators, getalltriberules, deletetriberule, banUser, getBanUsers, removeUserBan, searchBanUsers, muteUser, getMutedUsers, inviteMembers, approveMember, getAllApprovedMembers, getAlltribeInvite, removeApprovedUser, removeUserInvite, updateUserBan, getAllModQueuePosts, updateUnModeratedPostStatus };