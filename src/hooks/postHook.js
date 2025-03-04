import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTribeDetails } from '../services/tribe';
import { getHomeFeed, getPopularFeed, getPost, getRecentPost, getTrendingTodayPost } from '../services/posts';
import { getAllPostComment, postComment, replyToComment } from '../services/comment';

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

export const useHomeFeed = () => {
    return useInfiniteQuery({
        queryKey: ['homeFeed'], // Query key as an array
        queryFn: ({ pageParam = 1 }) => getHomeFeed(pageParam, 2), // Fetch function
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return lastPage.data.data.length > 0 ? nextPage : undefined; // Determine the next page
        },
        refetchOnWindowFocus: false,
    });
};

export const usePopularFeed = () => {
    return useInfiniteQuery({
        queryKey: ['popularFeed'], // Query key as an array
        queryFn: ({ pageParam = 1 }) => getPopularFeed(pageParam, 2), // Fetch function
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return lastPage.data.data.length > 0 ? nextPage : undefined; // Determine the next page
        },
        refetchOnWindowFocus: false,
    });
};

export const usePostComment = (post_id) => {
    return useInfiniteQuery({
        queryKey: ['postComment'], // Query key as an array
        queryFn: ({ pageParam = 1 }) => getAllPostComment(post_id, pageParam), // Fetch function
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return lastPage.data.data.length > 0 ? nextPage : undefined; // Determine the next page
        },
        refetchOnWindowFocus: false,
    });
};

export const useRecentPost = () => {
    return useQuery({
        queryKey: ['recent-post'],
        queryFn: async () => {
            const response = await getRecentPost();
            return response.data.data; // Extract the `data` property
        },
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        onError: (error) => {
            console.error('Error fetching tribe details:', error);
        },
        refetchOnWindowFocus: false
    })
}

export const useTrendingTodayPost = () => {
    return useQuery({
        queryKey: ['trendingToday'],
        queryFn: async () => {
            const response = await getTrendingTodayPost();
            return response.data.data; // Extract the `data` property
        },
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        onError: (error) => {
            console.error('Error fetching tribe details:', error);
        },
        refetchOnWindowFocus: false
    })
}

export const useAddComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({commentText, postId}) => {
            return postComment(commentText, postId)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['postComment']);
        },
        onError: (error) => {
            console.error('Error fetching post data:', error);
        },
    })
}

export const useReplyComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({commentText, commentId}) => {
            return replyToComment(commentText, commentId)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['postComment']);
        },
        onError: (error) => {
            console.error('Error fetching post data:', error);
        },
    })
}