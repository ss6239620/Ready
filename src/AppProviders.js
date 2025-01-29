// AppProviders.js
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserProvider from './Context/UserContext';
import { ChatRoomProvider } from './Context/ChatRoomContext';


const queryClient = new QueryClient();
export const AppProviders = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        {/* any new provider  */}
        {children}
      </UserProvider>
    </QueryClientProvider>
  );
};
