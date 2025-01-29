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
        <div className='h-[100vh] flex flex-col overflow-hidden '>
            <div className='w-[100%]' >
                <div className='div-center-justify divider-bottom px-4 py-2 secondary-bg' >
                    <div>
                        <h4
                            className='small-text-large-weight'
                        >
                            {userInfo?.username}
                        </h4>
                    </div>
                    <IconButton Icon={CiSettings} size={25} />
                </div>
            </div>

            {/* center content  */}
            <div
                className='slectDivContainer flex flex-1 flex-col-reverse overflow-y-auto px-[15px]'
            >


                <div className='secondary-bg p-1 rounded-xl my-5' >
                    <a
                        className='small-text-small-weight'
                    >
                        Send an invite message to start chatting! 👋
                    </a>
                </div>
            </div>

            {/* bottom content  */}
            <div className='bottom-0 w-[100%]' >
                <div className='div-center-justify secondary-bg  p-[15px] divider-top gap-[10px]'>
                    <IconButton className={'p-[12px!important]'} Icon={SlCamera} size={23}  />
                    <div className='flex-1'>
                        <Basicinput className={'p-[12px!important]'} setFormValues={setFormValue} value={formValue.message} name={'message'} placeHolder={'message'} />
                    </div>
                    <IconButton className={'p-[12px!important]'} Icon={IoSendSharp} size={23}  onClick={handleClick} />
                </div>
            </div>
        </div>
    )
}
