// store/postStore.js
import { create } from 'zustand'

export const usePostStore = create((set, get) => ({
    postStates: {},

    // Get post state with defaults
    getPostState: (postId) => {
        return get().postStates[postId] || {};
    },

    // Update specific post state
    updatePostState: (postId, updates) => {
        set(state => ({
            postStates: {
                ...state.postStates,
                [postId]: {
                    ...(state.postStates[postId] || {}),
                    ...updates
                }
            }
        }));
    },

    // Toggle saved state
    toggleSaved: (postId) => {
        const current = get().postStates[postId]?.isSaved ?? false;
        get().updatePostState(postId, { isSaved: !current });
    },

    toggleHide: (postId) => {
        const current = get().postStates[postId]?.isHide ?? false;
        get().updatePostState(postId, { isHide: !current });
    },

    // Handle vote updates
    updateVote: (postId, vote) => {
        const store = get();
        const postState = store.postStates[postId] || {};
        const currentVote = postState.postVote ?? 0;
        const isUpvoted = postState.isUpVoted ?? false;
        const isDownvoted = postState.isDownVoted ?? false;

        let newVote = currentVote;
        let newUpvoted = false;
        let newDownvoted = false;

        if (vote === 1) { // Upvote
            if (isUpvoted) {
                newVote -= 1; // Remove upvote
            } else {
                if (isDownvoted) {
                    newVote += 2; // Change from downvote to upvote
                } else {
                    newVote += 1; // New upvote
                }
                newUpvoted = true;
                newDownvoted = false;
            }
        } else { // Downvote
            if (isDownvoted) {
                newVote += 1; // Remove downvote
            } else {
                if (isUpvoted) {
                    newVote -= 2; // Change from upvote to downvote
                } else {
                    newVote -= 1; // New downvote
                }
                newDownvoted = true;
                newUpvoted = false;
            }
        }

        store.updatePostState(postId, {
            postVote: newVote,
            isUpVoted: newUpvoted,
            isDownVoted: newDownvoted
        });
    },

    // Reset states
    resetPostStates: (postId) => {
        if (postId) {
            set(state => {
                const newState = { ...state.postStates };
                delete newState[postId];
                return { postStates: newState };
            });
        } else {
            set({ postStates: {} });
        }
    }
}));