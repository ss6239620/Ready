import React, { createContext, useEffect, useState } from "react";
import { getAllUserChatRoom } from "../services/chat";

const ChatroomContext = createContext()

// ChatroomContext.js
export const ChatRoomProvider = ({ children }) => {
    const [chatrooms, setChatRooms] = useState([]);
    const [loading, setLoading] = useState(false)

    // Fetch chatrooms on load
    useEffect(() => {
        fetchAlUserChatRooms();
    }, []);

    function fetchAlUserChatRooms() {
        setLoading(true)
        getAllUserChatRoom().then(res => {
            setChatRooms(res.data.data)
            console.log('sidebar data',res.data.data);
            
        }).catch(err => {
            console.log(err.response.data);
        }).finally(() => {
            setLoading(false)
        })
    }

    const updateChatroom = (updatedChatroom) => {
        // Reorder the chatrooms so that the updated chatroom moves to the top
        setChatRooms((prevChatrooms) => {
            // Remove the chatroom from its current position
            const updatedList = prevChatrooms.filter(chatroom => chatroom._id !== updatedChatroom._id);

            // Add the updated chatroom to the top
            return [updatedChatroom, ...updatedList];
        });
    };

    return (
        <ChatroomContext.Provider value={{ chatrooms, updateChatroom, loading }}>
            {children}
        </ChatroomContext.Provider>
    );
};

export const useChatroom = () => React.useContext(ChatroomContext);
