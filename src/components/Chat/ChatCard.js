import React from 'react'
import '../../asset/css/util.css'
import { truncateText, formatTimeDifference } from '../../utils/CommonFunction'
import { darkColorTheme, FILE_URL } from '../../constant'
import { useNavigate } from 'react-router-dom'

export default function ChatCard({ style, data }) {
    const latest_msg_time = formatTimeDifference(data?.latest_message?.created_at);
    const navigate = useNavigate();
    const room_id = localStorage.getItem('room_id');

    function handleNavigate(params) {
        const room_id = localStorage.getItem('room_id');
        if (room_id) {
            localStorage.removeItem('room_id');
        }
        localStorage.setItem('room_id', data?._id);
        navigate(`/chat/room/${data?._id}`)
    }
    return (
        <div onClick={handleNavigate} className={`div-center div-hover-bg-change ${room_id === data?._id ? 'selected-chat' : ''} gap-[8px] p-[10px] mx-2 rounded-[10px] `} style={{ ...style }}>
            <img
                src={`${FILE_URL}/${data?.chat_room_picture}`}
                alt=""
                className='img-small-style'
            />
            <div className='w-[100%]'>
                <div className='div-center-justify' >
                    <h4
                        className='small-text-large-weight'
                    >
                        {data?.chat_room_name}
                    </h4>
                    <a
                        className='small-text-small-weight'
                    >
                        {latest_msg_time} ago
                    </a>
                </div>
                <a
                    className='small-text-small-weight'
                >
                    {truncateText(data?.latest_message?.message, 35)}
                </a>
            </div>
        </div>
    )
}
