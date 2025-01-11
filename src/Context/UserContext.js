import React, { useContext, createContext, useState, useEffect } from 'react'
import { logoutService } from '../services/auth';
import useLocalStorage from 'use-local-storage'

const UserContext = createContext()

export const useUser = () => {
    return useContext(UserContext)
}

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

    function switchTheme() {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }

    // Apply the theme to the body class whenever the theme changes
    useEffect(() => {
        document.body.classList.toggle('dark-theme', theme === 'dark');
    }, [theme]);

    useEffect(() => {
        // Check if user is in localStorage
        const savedUser = localStorage.getItem("user");
        const jsonData = JSON.parse(savedUser)
        setUser(jsonData)
        if (jsonData) {
            const cookieExpireDate = new Date(jsonData.user.cookieExpire)
            if (cookieExpireDate <= new Date()) {
                console.log('logout....');
                logout()
            }
        }
    }, []);

    const logout = () => {
        logoutService().then(() => {
            setUser(null);
            localStorage.removeItem("user");
            localStorage.removeItem("room_id");
        }).catch((err) => {
            console.log('Not able to logout');
        })
    };


    return (
        <UserContext.Provider value={{ user, setUser, logout,switchTheme,theme }}>
            {children}
        </UserContext.Provider>
    )
}
