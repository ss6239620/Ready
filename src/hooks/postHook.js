import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTribeDetails } from '../services/tribe';
import { getHomeFeed, getPopularFeed, getPost, getRecentPost, getTrendingTodayPost, hidePostService, makeVote, savePostService } from '../services/posts';
import { getAllPostComment, postComment, replyToComment } from '../services/comment';
import { usePostStore } from '../store/postStore'

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
        mutationFn: ({ commentText, postId }) => {
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
        mutationFn: ({ commentText, commentId, post_id }) => {
            return replyToComment(commentText, commentId, post_id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['postComment']);
        },
        onError: (error) => {
            console.error('Error fetching post data:', error);
        },
    })
}

export const useSavePost = () => {
    const { toggleSaved } = usePostStore();

    return useMutation({
        mutationFn: ({ post_id }) => savePostService(post_id),
        onMutate: ({ post_id }) => {
            // Optimistically update the UI
            toggleSaved(post_id);
        },
        onError: (error, { post_id }) => {
            // Revert if error occurs
            toggleSaved(post_id);
            console.error('Error saving post:', error);
        }
    });
};

export const useHidePost = () => {
    const { toggleHide } = usePostStore();

    return useMutation({
        mutationFn: ({ post_id }) => hidePostService(post_id),
        onMutate: ({ post_id }) => {
            // Optimistically update the UI
            toggleHide(post_id);
        },
        onError: (error, { post_id }) => {
            // Revert if error occurs
            toggleHide(post_id);
            console.error('Error hiding post:', error);
        }
    });
};

export const useMakeVote = () => {
    const { updateVote } = usePostStore();

    return useMutation({
        mutationFn: ({ post_id, vote }) => makeVote(post_id, vote),
        onMutate: ({ post_id, vote }) => {
            // Optimistically update the UI
            updateVote(post_id, vote);
        },
        onError: (error, { post_id, vote }) => {
            // Revert if error occurs
            updateVote(post_id, vote === 1 ? 0 : 1); // Toggle back
            console.error('Error voting on post:', error);
        }
    });
};
