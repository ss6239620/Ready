import React, { useEffect } from 'react'
import useLocalStorage from 'use-local-storage'
import './../../index.css';
import { Outlet } from 'react-router-dom';
import ModSidebar from './ModSidebar';
import Navbar from '../Navigation/Navbar';

export default function ModLayout() {
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

    return (
        <>
            <Navbar />
            <div className='flex flex-1' >
                <div className='sidebar' >  {/* Fixed width for the sidebar */}
                    <ModSidebar />
                </div>
                <div className='sidebar flex-[0.24]' ></div>
                <div className='flex-1' > {/* Take remaining space */}
                    <Outlet />
                </div>
            </div>
        </>
    )
}
