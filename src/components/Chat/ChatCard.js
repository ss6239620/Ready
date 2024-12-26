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
        <div onClick={handleNavigate} className='div-center div-hover-bg-change' style={{ gap: 8, padding: 10, backgroundColor: room_id === data?._id ? '#212121' : null, ...style }}>
            <img
                src={`${FILE_URL}/${data?.chat_room_picture}`}
                alt=""
                style={{
                    width: "35px",
                    height: "35px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    display: "block",
                }}
            />
            <div style={{ width: '100%' }}>
                <div className='div-center' style={{ justifyContent: 'space-between', }}>
                    <h4
                        style={{
                            marginInline: 3,
                            marginBlock: 5,
                            fontSize: 13.5,
                            fontWeight: 700,
                            color: darkColorTheme.primaryTextColor,
                        }}
                    >
                        {data?.chat_room_name}
                    </h4>
                    <a
                        style={{
                            marginInline: 3,
                            marginBlock: 5,
                            fontSize: 13.5,
                            fontWeight: 400,
                            color: darkColorTheme.secondaryTextColor,
                        }}
                    >
                        {latest_msg_time} ago
                    </a>
                </div>
                <a
                    style={{
                        marginInline: 3,
                        marginBlock: 5,
                        fontSize: 13.5,
                        fontWeight: 400,
                        color: darkColorTheme.secondaryTextColor,
                    }}
                >
                    {truncateText(data?.latest_message?.message, 35)}
                </a>
            </div>
        </div>
    )
}
