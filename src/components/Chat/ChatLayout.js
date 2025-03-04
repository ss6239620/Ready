import React, { useEffect } from 'react'
import useLocalStorage from 'use-local-storage'
import './../../index.css';
import { Outlet } from 'react-router-dom';
import ChatSidebar from './ChatSidebar';
import { ChatRoomProvider } from '../../Context/ChatRoomContext';

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
    <ChatRoomProvider>
      <div className='flex' >
        <div className='flex-[0 0 25%]'> {/* Fixed width for the sidebar */}
          <ChatSidebar />
        </div>
        <div className='flex-1' > {/* Take remaining space */}
          <Outlet />
        </div>
      </div>
    </ChatRoomProvider>
  )
}
