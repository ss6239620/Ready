import React, { useEffect, useState } from 'react'
import { darkColorTheme } from '../../constant'
import IconButton from '../../utils/buttons/IconButton'
import { RiChatNewLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { PiSlidersHorizontal } from "react-icons/pi";
import { MdArrowForwardIos } from "react-icons/md";
import '../../asset/css/util.css'
import ChatCard from './ChatCard';
import { IoTelescope } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import { getAllUserChatRoom } from '../../services/chat';
import { useChatroom } from '../../Context/ChatRoomContext'

export default function ChatSidebar() {

    const navigate = useNavigate();

    const { chatrooms, loading } = useChatroom();

    return (
        <div className='slectDivContainer' style={{ borderRight: `0.1px solid ${darkColorTheme.divider}`, overflowY: 'scroll', height: '100vh', position: 'sticky', top: 0 }}>
            <div className='div-center' style={{ justifyContent: 'space-between', padding: 10, }}>
                <div className='div-center' style={{ gap: 8 }}>
                    <img
                        src={require('../../asset/img/logo.png')}
                        alt=""
                        style={{
                            width: "35px",
                            height: "35px",
                            objectFit: "cover",
                            borderRadius: "50%", // Optional: makes the image circular
                            display: "block", // Removes extra space under image
                        }}
                    />
                    <h4
                        style={{
                            marginInline: 3,
                            marginBlock: 5,
                            fontSize: 18,
                            fontWeight: 700,
                            color: darkColorTheme.primaryTextColor,
                        }}
                    >
                        Chats
                    </h4>
                </div>
                <div className='div-center' style={{ gap: 8 }}>
                    <IconButton Icon={RiChatNewLine} size={20} onClick={() => navigate('/chat/room/create')} />
                    <div className='div-center bright-border-button-hover' style={{ gap: 2, padding: 8 }}>
                        <PiSlidersHorizontal size={20} />
                        <IoIosArrowDown size={20} />
                    </div>
                </div>
            </div>
            <div style={{ borderTop: `0.1px solid ${darkColorTheme.divider}`, marginTop: 20, }}>
                <div className='div-center div-hover-bg-change' style={{ justifyContent: 'space-between', padding: 10, }}>
                    <div className='div-center' style={{ gap: 2, padding: 8 }}>
                        <IoTelescope size={25} />
                        <h4
                            style={{
                                marginInline: 3,
                                marginBlock: 5,
                                fontSize: 13.5,
                                fontWeight: 700,
                                color: darkColorTheme.primaryTextColor,
                            }}
                        >
                            Discover Chat Channels
                        </h4>
                    </div>
                    <MdArrowForwardIos size={15} />
                </div>

                <div>
                    {
                        !loading ?
                            chatrooms.map((item, key) => (
                                <ChatCard key={key} data={item} />
                            ))
                            :
                            <div>Loading....</div>
                    }
                </div>
            </div>
        </div>
    )
}
