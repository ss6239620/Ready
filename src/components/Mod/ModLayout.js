import React, { useEffect } from 'react'
import useLocalStorage from 'use-local-storage'
import './../../index.css';
import { Outlet } from 'react-router-dom';
import ModSidebar from './ModSidebar';
import Navbar from '../Navigation/Navbar';
import { AppProviders } from '../../AppProviders';

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
        <AppProviders>
            <Navbar />
            <div style={{ display: 'flex', flex: 1 }}>
                <div className='sidebar' style={{}}>  {/* Fixed width for the sidebar */}
                    <ModSidebar />
                </div>
                <div className='sidebar' style={{ flex: 0.24 }}></div>
                <div style={{ flex: 1 }}> {/* Take remaining space */}
                    <Outlet />
                </div>
            </div>
        </AppProviders>
    )
}
