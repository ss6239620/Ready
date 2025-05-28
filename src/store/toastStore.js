import { FaCheck } from 'react-icons/fa';
import { create } from 'zustand'

export const useToastStore = create((set) => ({
    toast: { visible: false, message: '', type: 'success', icon: FaCheck }, // type can be 'success', 'error', etc.

    showToast: (message, type = "success", icon = FaCheck) => set({ toast: { visible: true, message, type, icon } }),

    hideToast: () => set({ toast: { visible: false, message: '', type: 'success', icon: FaCheck } }),
}));