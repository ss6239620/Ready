import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createRule, deletetriberule, getalltriberules } from '../services/mod';
import { useNavigate } from 'react-router-dom';

export const useCreateRules = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: ({ rule_title, rule_desc, rule_reason }) => {
            let tribe_id = JSON.parse(localStorage.getItem("mod_tribe"));
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
            let tribe_id = JSON.parse(localStorage.getItem("mod_tribe"));
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
            let tribe_id = JSON.parse(localStorage.getItem("mod_tribe"));
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
