import React, { useContext, createContext, useState, useEffect } from 'react'
import { logoutService } from '../services/auth';

const UserContext = createContext()

export const useUser = () => {
    return useContext(UserContext)
}

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is in localStorage
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            const jsonData = JSON.parse(savedUser)
            const cookieExpireDate = new Date(jsonData.user.cookieExpire)
            if (cookieExpireDate <= new Date()) {
                console.log('logout....');
                logout()
            }
            setUser(jsonData)
        }
    }, []);

    const logout = () => {
        logoutService().then(() => {
            setUser(null);

            localStorage.removeItem("user");
        }).catch((err) => {
            console.log('Not able to logout');
        })
    };


    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}
