import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { approveMember, banUser, createRule, deletetriberule, getAllApprovedMembers, getAllModerators, getAlltribeInvite, getalltriberules, getAllModQueuePosts, getBanUsers, getMutedUsers, inviteMembers, muteUser, removeUserBan, removeUserInvite, searchBanUsers, updateUnModeratedPostStatus, updateUserBan } from '../services/mod';
import { useNavigate } from 'react-router-dom';
import { useToastStore } from '../store/toastStore';
import { BsEnvelope } from "react-icons/bs";

export const useCreateRules = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: ({ rule_title, rule_desc, rule_reason }) => {
            const tribe_id = JSON.parse(localStorage.getItem("mod_tribe"));
            return createRule(tribe_id, rule_title, rule_desc, rule_reason);
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries(['tribe-rules'])
            navigate(-1);
        },
        onError: (error) => {
            console.error('Error fetching post data:', error);
        },
    })
}

export const useDeleteTribeRules = () => {
    const showToast = useToastStore((state) => state.showToast);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ rule_id }) => {
            const tribe_id = JSON.parse(localStorage.getItem("mod_tribe"));
            return deletetriberule(tribe_id, rule_id);
        },
        onSuccess: (res) => {
            showToast('Rules deleted successfully!', 'success');
            queryClient.invalidateQueries(['tribe-rules'])
        },
        onError: (error) => {
            console.error('Error fetching post data:', error);
        },
    })
}

export const useTribeRules = () => {
    return useQuery({
        queryKey: ['tribe-rules'],
        queryFn: async () => {
            const tribe_id = JSON.parse(localStorage.getItem("mod_tribe"));
            const response = await getalltriberules(tribe_id);
            return response.data.data; // Extract the `data` property
        },
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        onError: (error) => {
            console.error('Error fetching tribe details:', error);
        },
        refetchOnWindowFocus: false
    })
}

export const useBanUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ ban_reason, ban_user_id, mod_note, msg_to_user, ban_duration }) => {
            const tribe_id = JSON.parse(localStorage.getItem("mod_tribe"));
            return banUser(tribe_id, ban_reason, ban_user_id, mod_note, msg_to_user, ban_duration);
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries(['tribe-ban-users'])
        },
        onError: (error) => {
            console.error('Error fetching post data:', error);
        },
    })
}

export const useUpdateUserBan = () => {
    const queryClient = useQueryClient();
    const showToast = useToastStore((state) => state.showToast);
    return useMutation({
        mutationFn: ({ ban_reason, ban_id, mod_note, msg_to_user, ban_duration }) => {
            const tribe_id = JSON.parse(localStorage.getItem("mod_tribe"));
            return updateUserBan(tribe_id, ban_reason, ban_id, mod_note, msg_to_user, ban_duration);
        },
        onSuccess: (res) => {
            showToast("Updated user ban.", 'success');
            queryClient.invalidateQueries(['tribe-ban-users'])
        },
        onError: (error) => {
            showToast("unable to update user ban.", 'error');
            console.error('Error fetching post data:', error);
        },
    })
}

export const useGetBanUsers = (page, limit = 10) => {
    return useQuery({
        queryKey: ['tribe-ban-users', page, limit],
        queryFn: async () => {
            const tribe_id = JSON.parse(localStorage.getItem("mod_tribe"));
            const response = await getBanUsers(tribe_id, page, limit);
            return response.data.data; // Extract the `data` property
        },
        keepPreviousData: true,
        onError: (error) => {
            console.error('Error fetching tribe details:', error);
        },
    })
}

export const useSearchBannedUser = ({ query, restrict_type }) => {
    return useQuery({
        queryKey: ['tribe-search-ban-users', query],
        queryFn: async () => {
            const tribe_id = JSON.parse(localStorage.getItem("mod_tribe"));
            const response = await searchBanUsers(tribe_id, query, restrict_type);
            return response.data.data; // Extract the `data` property
        },
        enabled: false,
        keepPreviousData: true,
        onError: (error) => {
            console.error('Error fetching tribe details:', error);
        },
    })
}

export const useRemoveUserBan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ ban_id }) => {
            const tribe_id = JSON.parse(localStorage.getItem("mod_tribe"));
            return removeUserBan(tribe_id, ban_id);
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries(['tribe-ban-users', 'tribe-muted-users']);
        },
        onError: (error) => {
            console.error('Error fetching post data:', error);
        },
    })
}

export const useMuteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ mute_user_id, mod_note, mute_duration }) => {
            const tribe_id = JSON.parse(localStorage.getItem("mod_tribe"));
            return muteUser(tribe_id, mute_user_id, mod_note, mute_duration);
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries(['tribe-muted-users']);
        },
        onError: (error) => {
            console.error('Error fetching post data:', error);
        },
    })
}

export const useGetMutedUsers = (page, limit = 10) => {
    return useQuery({
        queryKey: ['tribe-muted-users', page, limit],
        queryFn: async () => {
            const tribe_id = JSON.parse(localStorage.getItem("mod_tribe"));
            const response = await getMutedUsers(tribe_id, page, limit);
            return response.data.data; // Extract the `data` property
        },
        keepPreviousData: true,
        onError: (error) => {
            console.error('Error fetching tribe details:', error);
        },
    })
}

export const useInviteMember = () => {
    const queryClient = useQueryClient();
    const showToast = useToastStore((state) => state.showToast);
    return useMutation({
        mutationFn: ({ user_id, permissions }) => {
            const tribe_id = JSON.parse(localStorage.getItem("mod_tribe"));
            return inviteMembers(tribe_id, user_id, permissions);
        },
        onSuccess: (res) => {
            showToast(`${res.data.data}`, 'success', BsEnvelope);
            queryClient.invalidateQueries(['tribe-moderators', 'tribe-invites']);
        },
        onError: (error) => {
            showToast(error?.response?.data?.error, 'error');
        },
    })
}

export const useGetAllModerators = (limit = 10) => {
    return useInfiniteQuery({
        queryKey: ['tribe-moderators'],
        queryFn: async ({ pageParam = 1 }) => {
            const tribe_id = JSON.parse(localStorage.getItem("mod_tribe"));
            const response = await getAllModerators(tribe_id, pageParam, limit);
            return response;
        },
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return lastPage.data.data.length > 0 ? nextPage : undefined; // Determine the next page
        },
        keepPreviousData: true,
        onError: (error) => {
            console.error('Error fetching tribe details:', error);
        },
    })
}

export const useApproveMember = () => {
    const queryClient = useQueryClient();
    const showToast = useToastStore((state) => state.showToast);
    return useMutation({
        mutationFn: ({ user_id }) => {
            const tribe_id = JSON.parse(localStorage.getItem("mod_tribe"));
            return approveMember(tribe_id, user_id);
        },
        onSuccess: (res) => {
            showToast(`${res.data.data}`, 'success');
            queryClient.invalidateQueries(['tribe-approved-members']);
        },
        onError: (error) => {
            showToast(error?.response?.data?.error, 'error');
        },
    })
}

export const useGetAllApprovedMembers = (limit = 10) => {
    return useInfiniteQuery({
        queryKey: ['tribe-approved-members'],
        queryFn: async ({ pageParam = 1 }) => {
            const tribe_id = JSON.parse(localStorage.getItem("mod_tribe"));
            const response = await getAllApprovedMembers(tribe_id, pageParam, limit);
            return response;
        },
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return lastPage.data.data.length > 0 ? nextPage : undefined; // Determine the next page
        },
        keepPreviousData: true,
        onError: (error) => {
            console.error('Error fetching tribe details:', error);
        },
    })
}

export const useGetAllInvite = (limit = 10) => {
    return useInfiniteQuery({
        queryKey: ['tribe-invites'],
        queryFn: async ({ pageParam = 1 }) => {
            const tribe_id = JSON.parse(localStorage.getItem("mod_tribe"));
            const response = await getAlltribeInvite(tribe_id, pageParam, limit);
            return response;
        },
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return lastPage.data.data.length > 0 ? nextPage : undefined; // Determine the next page
        },
        keepPreviousData: true,
        onError: (error) => {
            console.error('Error fetching tribe details:', error);
        },
    })
}

export const useRemoveInvite = () => {
    const queryClient = useQueryClient();
    const showToast = useToastStore((state) => state.showToast);
    return useMutation({
        mutationFn: ({ member_id }) => {
            const tribe_id = JSON.parse(localStorage.getItem("mod_tribe"));
            return removeUserInvite(tribe_id, member_id);
        },
        onSuccess: (res, variable) => {
            showToast(`Removed ${variable.method}`, 'success');
            queryClient.invalidateQueries(['tribe-invites', 'tribe-approved-members', 'tribe-moderators']);
        },
        onError: (error) => {
            console.error('Error fetching post data:', error);
        },
    })
}

export const useGetAllModQueuePosts = (post_status, limit = 10) => {
    const tribe_id = JSON.parse(localStorage.getItem("mod_tribe"));
    return useInfiniteQuery({
        queryKey: ['tribe-modQueuePosts', post_status, tribe_id],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await getAllModQueuePosts(tribe_id, pageParam, limit, post_status);
            return response;
        },
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return lastPage.data.data.length > 0 ? nextPage : undefined; // Determine the next page
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        onError: (error) => {
            console.error('Error fetching tribe details:', error);
        },
    })
}

export const useUpdateUnModeartedPostStatus = () => {
    const queryClient = useQueryClient();
    const showToast = useToastStore((state) => state.showToast);
    const tribe_id = JSON.parse(localStorage.getItem("mod_tribe"));
    return useMutation({
        mutationFn: ({ post_id, post_action }) => {
            return updateUnModeratedPostStatus(tribe_id, post_id, post_action);
        },
        onSuccess: (res, variable) => {
            showToast(`Post status changes to ${variable.post_action}`, 'success');
            queryClient.invalidateQueries(['tribe-modQueuePosts', variable.post_action, tribe_id]);
        },
        onError: (error) => {
            console.error('Error fetching post data:', error);
        },
    })
}