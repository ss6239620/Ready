import React, { useEffect } from 'react'
import useLocalStorage from 'use-local-storage'
import './../../index.css';
import Navbar from './../Navigation/Navbar';
import Sidebar from './../Navigation/Sidebar';
import Home from './../Home/Home';
import { Outlet } from 'react-router-dom';
import { AppProviders } from '../../AppProviders';

export default function Layout() {
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
      <div className='root'>
        <Navbar />
        {/* <button onClick={switchTheme}>
        Switch to {theme === 'light' ? "Dark" : "Light"} Theme
      </button> */}
        <div style={{ display: 'flex', flex: 1 }}>
          <div className='sidebar' style={{  }}> {/* Fixed width for the sidebar */}
            <Sidebar />
          </div>
          <div style={{flex:0.23}}></div>
          <div style={{ flex:1 }}> {/* Take remaining space */}
            <Outlet />
          </div>
        </div>
      </div>
    </AppProviders>
  )
}
