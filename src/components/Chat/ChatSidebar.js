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
        <div className='slectDivContainer divider-right h-[100vh] sticky overflow-y-auto top-0 ' >
            <div className='div-center-justify p-3' >
                <div className='div-center gap-2' >
                    <img
                        src={require('../../asset/img/logo.png')}
                        alt=""
                        className='img-small-style'
                    />
                    <h4
                        className='extra-large-text-large-weight'
                    >
                        Chats
                    </h4>
                </div>
                <div className='div-center gap-2' >
                    <IconButton Icon={RiChatNewLine} size={20} onClick={() => navigate('/chat/room/create')} />
                    <div className='div-center bright-border-button-hover gap-1 p-2' >
                        <PiSlidersHorizontal size={20} />
                        <IoIosArrowDown size={20} />
                    </div>
                </div>
            </div>
            <div className='divider-top' >
                <div className='div-center-justify p-3 div-hover-bg-change'>
                    <div className='div-center gap-2 p-2' >
                        <IoTelescope size={25} />
                        <h4
                            className="large-text-normnal-weight"
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
                                <ChatCard key={key} data={item}  />
                            ))
                            :
                            <div>Loading....</div>
                    }
                </div>
            </div>
        </div>
    )
}
