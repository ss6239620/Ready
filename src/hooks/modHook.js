import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { banUser, createRule, deletetriberule, getalltriberules, getBanUsers, getMutedUsers, muteUser, removeUserBan, searchBanUsers } from '../services/mod';
import { useNavigate } from 'react-router-dom';

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
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ rule_id }) => {
            const tribe_id = JSON.parse(localStorage.getItem("mod_tribe"));
            return deletetriberule(tribe_id, rule_id);
        },
        onSuccess: (res) => {
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

export const useSearchBannedUser = ({ query,restrict_type }) => {
    return useQuery({
        queryKey: ['tribe-search-ban-users', query],
        queryFn: async () => {
            const tribe_id = JSON.parse(localStorage.getItem("mod_tribe"));
            const response = await searchBanUsers(tribe_id, query,restrict_type);
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
            queryClient.invalidateQueries(['tribe-ban-users','tribe-muted-users']);
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
            console.log(res);
            
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