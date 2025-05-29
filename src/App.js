import React from 'react'
import './index.css';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Explore from './components/Home/Explore';
import TribeHomePage from './components/Tribe/TribeHomePage';
import CreatePost from './components/Posts/CreatePost';
import Comment from './components/Posts/Comment';
import SearchHomePage from './components/Search/SearchHomePage';
import UserHomePage from './components/Profile/UserHomePage';
import ChatLayout from './components/Chat/ChatLayout';
import ChatRoom from './components/Chat/ChatRoom';
import StartChat from './components/Chat/StartChat';
import ChatUser from './components/Chat/ChatUser';
import Popular from './components/Home/Popular';
import ModLayout from './components/Mod/ModLayout';
import Queues from './components/Mod/Overview/Queues/Queues';
import Rules from './components/Mod/Moderation/Rules/Rules';
import CreateRules from './components/Mod/Moderation/Rules/CreateRules';
import { AppProviders } from './AppProviders';
import RestrictedUsers from './components/Mod/Overview/RestrictUsers/RestrictedUsers';
import Moderators from './components/Mod/Overview/ModsMembers/Moderators';
import SuccessAlert from './utils/Alert/SuccessAlert';

export default function App() {
  return (
    <AppProviders>
      <SuccessAlert />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="popular" element={<Popular />} />
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

          {/* Route for mod that takes up the entire screen */}
          <Route path="mod" element={<ModLayout />} >
            <Route path=":id/queue" element={<Queues />} />
            <Route path=":id/restrict_user" element={<RestrictedUsers />} />
            <Route path=":id/moderators" element={<Moderators />} />
            <Route path=":id/rules" element={<Rules />} />
            <Route path=":id/rules/new" element={<CreateRules />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  )
}
