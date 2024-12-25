// AppProviders.js
import React from 'react';
import UserProvider from './Context/UserContext';
import { ChatRoomProvider } from './Context/ChatRoomContext';

// Wrapper component that combines all context providers
export const AppProviders = ({ children }) => {
  return (
    <UserProvider>
        {/* any new provider  */}
        {children}
    </UserProvider>
  );
};
