import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { login, removeSavedPostService, savePostService, signup } from '../services/auth';
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