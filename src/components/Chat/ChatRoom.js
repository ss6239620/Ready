import React, { useEffect, useRef, useState } from 'react'
import { CiSettings } from "react-icons/ci";
import { darkColorTheme, FILE_URL, SOCKET_URL } from '../../constant'
import IconButton from '../../utils/buttons/IconButton';
import { SlCamera } from "react-icons/sl";
import { IoSendSharp } from "react-icons/io5";
import Basicinput from '../../utils/input/Basicinput';
import io from 'socket.io-client'
import { getAllChatroomMessages, getChatRoomDetails, sendChatRoomMessage } from '../../services/chat';
import { useParams } from 'react-router-dom';
import { formatTimeDifference } from '../../utils/CommonFunction';
import { useUser } from '../../Context/UserContext';
import { useChatroom } from '../../Context/ChatRoomContext'

function ChatMessage({ data }) {
  const msg_time = formatTimeDifference(data.created_at)
  return (
    <div >
      <div className="div-start gap-2 my-1 " >
        <div>
          <img
            src={`${FILE_URL}/${data.sender.profile_avtar}`}
            alt=""
            className='img-small-style'
          />
        </div>
        <div>
          <div className="div-center gap-3">
            <h4
              className='small-text-large-weight'
            >
              {data.sender.username}
            </h4>
            <a
              className='small-text-small-weight'
            >
              {msg_time} ago
            </a>
          </div>
          <h4
            className='small-text-small-weight text-[14.5px] '
          >
            {data.message}
          </h4>
        </div>
      </div>
    </div>
  )
}

export default function ChatRoom({ }) {
  const [formValues, setFormValues] = useState({
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatRoomdetails, setChatRoomdetails] = useState([])
  const [connected, setConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');

  const socketRef = useRef(null);

  let { id } = useParams(); //chat room id
  const user = JSON.parse(localStorage.getItem('user'))

  const { updateChatroom } = useChatroom()

  function fetchAllChatRoomMessages() {
    setLoading(true)
    getAllChatroomMessages(id).then(res => {
      setMessages(res.data.data)
      if (socketRef.current) {
        socketRef.current.emit('join_chat', id);
      }
    }).catch(err => {
      console.log(err.response.data);
    }).finally(() => {
      setLoading(false)
    })
  }

  function fetchChatRoomDetails() {
    setLoading(true)
    getChatRoomDetails(id).then(res => {
      setChatRoomdetails(res.data.data)
    }).catch(err => {
      console.log(err.response.data);
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchAllChatRoomMessages();
    fetchChatRoomDetails()
  }, [id]);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL); // Ensure SOCKET_URL is correct

    socketRef.current.emit('setup', user.user);

    socketRef.current.on('connected', () => {
      setConnected(true);
      console.log("Connected to the socket server");
    });

    socketRef.current.on('typing', (user) => setTypingUser(`${user} is typing...`))

    socketRef.current.on('stop_typing', () => setTypingUser(''))

    //for receiver
    socketRef.current.on("message_received", (newMessageReceived) => {
      setMessages((prevMessages) => [newMessageReceived, ...prevMessages]);
      updateChatroom(newMessageReceived.chat_room_id)
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.off("connected");
        socketRef.current.disconnect();
        console.log("Disconnected from the socket server");
      }
    };
  }, [user, id]);

  function sendMessage() {
    if (!socketRef.current || !connected) {
      console.log('Socket is not initialized or not connected');
      return;
    }

    console.log('Sending message...');
    sendChatRoomMessage(id, formValues.message).then(res => {
      const data = res.data.data;
      socketRef.current.emit('new_message', data);

      // Optionally, update messages here:
      setMessages((prevMessages) => [data, ...prevMessages]);
      updateChatroom(data.chat_room_id)

    }).catch(err => {
      console.log(err.response.data);
    }).finally(() => {
      setFormValues({ message: '' });
    });
  }


  const handleInputChange = (e) => {

    if (formValues.message.length > 0 && !isTyping) {
      setIsTyping(true);
      socketRef.current.emit('typing', id, user.user.username);

      // Stop typing after a delay
      const typingTimeout = setTimeout(() => {
        setIsTyping(false);
        socketRef.current.emit('stop_typing', id);
      }, 2000);

      return () => clearTimeout(typingTimeout);
    }

    if (formValues.message.length === 0) {
      setIsTyping(false);
      socketRef.current.emit('stop_typing', id);
    }
  };

  return (
    <div className='h-[100vh] flex flex-col overflow-hidden '>
      <div className='w-[100%]'>
        <div className='div-center-justify divider-bottom px-4 py-2 secondary-bg' >
          <div>
            <h4
              className='small-text-large-weight'
            >
              {chatRoomdetails.chat_room_name}
            </h4>
            <a
              className='small-text-small-weight'
            >
              r/{chatRoomdetails.chat_room_name}
            </a>
            <div>{typingUser}</div>
          </div>
          <IconButton Icon={CiSettings} size={25} />
        </div>
      </div>

      {/* center content  */}
      <div
        className='slectDivContainer flex flex-1 flex-col-reverse overflow-y-auto px-[15px] '
      >
        {
          !loading ?
            messages.map((item, key) => (
              <ChatMessage key={key} data={item} />
            ))
            :
            <div>Loading...</div>
        }
      </div>

      {/* bottom content  */}
      <div className='bottom-0 w-[100%]' >
        <div className='div-center-justify secondary-bg p-[15px] divider-top gap-[10px]' >
          <IconButton  className={'p-[12px!important]'} Icon={SlCamera} size={23}  />
          <div className='flex-1'>
            <Basicinput className={'p-[12px!important]'} setFormValues={setFormValues} value={formValues.message} name={'message'} placeHolder={'message'}  onChangeFunc={handleInputChange} />
          </div>
          <IconButton className={'p-[12px!important]'} onClick={sendMessage} Icon={IoSendSharp} size={23} />
        </div>
      </div>
    </div>
  )
}
