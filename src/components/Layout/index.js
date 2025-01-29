import React, { useEffect } from 'react'
import './../../index.css';
import Navbar from './../Navigation/Navbar';
import Sidebar from './../Navigation/Sidebar';
import Home from './../Home/Home';
import { Outlet } from 'react-router-dom';
import { AppProviders } from '../../AppProviders';

export default function Layout() {

  return (
    <AppProviders>
      <div className='root'>
        <Navbar />
        {/* <button onClick={switchTheme}>
        Switch to {theme === 'light' ? "Dark" : "Light"} Theme
      </button> */}
        <div className='flex flex-1' >
          <div className='sidebar' > {/* Fixed width for the sidebar */}
            <Sidebar />
          </div>
          <div className='sidebar flex-[0.23]' ></div>
          <div className='flex-1' > {/* Take remaining space */}
            <Outlet />
          </div>
        </div>
      </div>
    </AppProviders>
  )
}
