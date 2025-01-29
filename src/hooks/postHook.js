import { useQuery } from '@tanstack/react-query';
import { getTribeDetails } from '../services/tribe';
import { getHomeFeed, getPost } from '../services/posts';

export const usePostData = (postId) => {
    return useQuery({
        queryKey: ['postData', postId],
        queryFn: async () => {
            const response = await getPost(postId);
            return response.data.data; // Extract the `data` property
        },
        enabled: !!postId, // Fetch only if postId exists
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        onSuccess: (data) => {
            document.title = data.data.content_title;
        },
        onError: (error) => {
            console.error('Error fetching post data:', error);
        },
    });
};

export const useTribeDetails = (tribeId) => {
    return useQuery({
        queryKey: ['tribeDetails', tribeId],
        queryFn: async () => {
            const response = await getTribeDetails(tribeId);
            return response.data.data; // Extract the `data` property
        },
        enabled: !!tribeId, // Fetch only if tribeId exists
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        onError: (error) => {
            console.error('Error fetching tribe details:', error);
        },
    });
};

export const useHomeFeed = (page) => {
    return useQuery({
        queryKey: 'userHomeFeed',
        queryFn: async () => {
            const response = await getHomeFeed(onpagehide,2);
            return response.data.data; // Extract the `data` property
        },
        enabled: !!page, 
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        onError: (error) => {
            console.error('Error fetching tribe details:', error);
        },
    });
};