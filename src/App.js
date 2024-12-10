import React from 'react'
import useLocalStorage from 'use-local-storage'
import './index.css';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Explore from './components/Explore/Explore';
import TribeHomePage from './components/Tribe/TribeHomePage';
import CreatePost from './components/Posts/CreatePost';
import Comment from './components/Posts/Comment';

export default function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  function switchTheme(params) {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="tribe/:id" element={<TribeHomePage />} />
          <Route path="comment/:tribeid/:postid" element={<Comment />} />
          <Route path="createpost" element={<CreatePost />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
