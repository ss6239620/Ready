import React, { useEffect, useState } from 'react'
import { CiSettings } from "react-icons/ci";
import { darkColorTheme } from '../../constant'
import IconButton from '../../utils/buttons/IconButton';
import { SlCamera } from "react-icons/sl";
import { IoSendSharp } from "react-icons/io5";
import Basicinput from '../../utils/input/Basicinput';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserInfo } from '../../services/auth';
import { createChatRoom } from '../../services/chat';

export default function ChatUser() {
    const [formValue, setFormValue] = useState({
        message: ''
    });
    const [userInfo, setUserInfo] = useState({})

    const { id } = useParams()

    const navigate = useNavigate()

    function fetchUserInfo(params) {
        getUserInfo(id).then(res => {
            setUserInfo(res.data.data);
        }).catch((err) => {
            console.log(err.response.data);
        })
    }

    useEffect(() => {
        fetchUserInfo()
    }, [])

    function handleClick(params) {
        if (formValue.message.length > 0) {
            createChatRoom(id, formValue.message).then((res) => {
                navigate(`/chat/room/${res.data.data}`)
            }).catch((err) => {
                console.log(err.response.data);
            })
        }
    }

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ width: '100%', }}>
                <div className='div-center secondary-bg' style={{ justifyContent: 'space-between', borderBottom: `0.1px solid ${darkColorTheme.divider}`, paddingInline: 15, paddingBlock: 8, }}>
                    <div>
                        <h4
                            style={{
                                marginBlock: 0,
                                fontSize: 13,
                                fontWeight: 700,
                            }}
                        >
                            {userInfo?.username}
                        </h4>
                    </div>
                    <IconButton Icon={CiSettings} size={25} />
                </div>
            </div>

            {/* center content  */}
            <div
                className='slectDivContainer'
                style={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column-reverse',
                    overflowY: 'auto',
                    paddingInline: 15,
                }}
            >


                <div className='secondary-bg' style={{
                    padding: 5,  borderRadius: 10, marginBlock: 20
                }}>
                    <a
                        style={{
                            marginBlock: 0,
                            fontSize: 12,
                            fontWeight: 400,
                        }}
                    >
                        Send an invite message to start chatting! 👋
                    </a>
                </div>
            </div>

            {/* bottom content  */}
            <div style={{ bottom: 0, width: '100%', }}>
                <div className='div-center secondary-bg' style={{ paddingInline: 10, paddingBlock: 15, borderTop: `0.1px solid ${darkColorTheme.divider}`,  justifyContent: 'space-between', gap: 10 }}>
                    <IconButton Icon={SlCamera} size={23} style={{ padding: 12 }} />
                    <div style={{ flex: 1 }}>
                        <Basicinput setFormValues={setFormValue} value={formValue.message} name={'message'} placeHolder={'message'} style={{ padding: 15, }} />
                    </div>
                    <IconButton Icon={IoSendSharp} size={23} style={{ padding: 12 }} onClick={handleClick} />
                </div>
            </div>
        </div>
    )
}
