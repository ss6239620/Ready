import React from 'react'
import './index.css';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Explore from './components/Search/Explore';
import TribeHomePage from './components/Tribe/TribeHomePage';
import CreatePost from './components/Posts/CreatePost';
import Comment from './components/Posts/Comment';
import SearchHomePage from './components/Search/SearchHomePage';
import UserHomePage from './components/Profile/UserHomePage';
import ChatLayout from './components/Chat/ChatLayout';
import ChatRoom from './components/Chat/ChatRoom';
import StartChat from './components/Chat/StartChat';
import ChatUser from './components/Chat/ChatUser';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="search" element={<SearchHomePage />} />
          <Route path="tribe/:id" element={<TribeHomePage />} />
          <Route path="comment/:tribeid/:postid" element={<Comment />} />
          <Route path="createpost" element={<CreatePost />} />
          <Route path="user/:id" element={<UserHomePage />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
        {/* Route for chat that takes up the entire screen */}
        <Route path="chat" element={<ChatLayout />} >
          <Route path='room/:id' element={<ChatRoom />} />
          <Route path='room/create' element={<StartChat />} />
          <Route path='user/:id' element={<ChatUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
