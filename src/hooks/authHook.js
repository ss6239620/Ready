import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserByUsername, login, searchUser, signup } from '../services/auth';
import { useUser } from '../Context/UserContext';
import SuccessAlert from '../utils/Alert/SuccessAlert';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const { setUser } = useUser();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ email, password, }) => {
            return login(email, password)
        },
        onSuccess: (res, variables) => {
            setUser(res.data.data);
            localStorage.setItem("user", JSON.stringify(res.data.data));

            if (variables.onClose && typeof variables.onClose === 'function') {
                variables.onClose();
            }
            navigate('/home');
        },
        onError: (error) => {
            console.error('Error fetching post data:', error);
        },
    })
}

export const useSignUp = () => {
    const { setUser } = useUser();

    return useMutation({
        mutationFn: (formData) => {
            return signup(formData)
        },
        onSuccess: (res) => {
            setUser(res.data.data);
            localStorage.setItem("user", JSON.stringify(res.data.data));

            window.location.reload();
        },
        onError: (error) => {
            console.error('Error fetching post data:', error);
        },
    })
}

export const useSearchUsers = ({ query, page }) => {
    return useQuery({
        queryKey: ['search-user', query, page],
        queryFn: async () => {
            const response = await searchUser(query, page);
            return response.data.data; // Extract the `data` property
        },
        enabled: query.length >= 3,
        keepPreviousData: false, // This will clear old data while loading new
        onError: (error) => {
            console.error('Error fetching tribe details:', error);
        },
    })
}

export const useSeachByUsername = ({ query }) => {
    return useQuery({
        queryKey: ['search-user-by-name', query],
        queryFn: async () => {
            const response = await getUserByUsername(query);
            return response.data.data; // Extract the `data` property
        },
        enabled: false,
        keepPreviousData: false, // This will clear old data while loading new
        onError: (error) => {
            console.error('Error fetching tribe details:', error);
        },
    })
}