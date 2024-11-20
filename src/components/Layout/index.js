import React from 'react'
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

  function switchTheme(params) {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)
  }

  return (
    <AppProviders>
      <div className='root' data-theme={theme}>
        <Navbar />
        {/* <button onClick={switchTheme}>
        Switch to {theme === 'light' ? "Dark" : "Light"} Theme
      </button> */}
        <div style={{ display: 'flex', flex: 1 }}>
          <div className='sidebar' style={{ flex: '0 0 18%' }}> {/* Fixed width for the sidebar */}
            <Sidebar />
          </div>
          <div style={{ flex: 1 }}> {/* Take remaining space */}
            <Outlet />
          </div>
        </div>
      </div>
    </AppProviders>
  )
}
