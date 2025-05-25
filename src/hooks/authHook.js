import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { login, searchUser, signup } from '../services/auth';
import { useUser } from '../Context/UserContext';
import SuccessAlert from '../utils/Alert/SuccessAlert';

export const useLogin = (email, password) => {
    const { setUser } = useUser();

    return useMutation({
        mutationFn: () => {
            return login(email, password)
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