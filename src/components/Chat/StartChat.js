import React, { useEffect, useState } from "react";
import { darkColorTheme, FILE_URL } from "../../constant";
import BigButton from "../../utils/buttons/BigButton";
import Basicinput from "../../utils/input/Basicinput";
import Checkbox from "../../utils/input/Checkbox";
import { searchUser } from "../../services/auth";
import { useNavigate } from 'react-router-dom'
import { chatRoomExist } from "../../services/chat";


function UserAddCard({ data, isSelected, onToggle }) {
    return (
        <div
            className="div-center-justify px-[15px]"
        >
            <div className="div-center gap-3 my-4" >
                <img
                    src={`${FILE_URL}/${data?.profile_avtar}`}
                    alt=""
                    className="img-small-style"
                />
                <a
                    className='small-text-small-weight'
                >
                    {data?.username}
                </a>
            </div>
            <Checkbox
                checked={isSelected}
                onChange={() => onToggle(data)}
            />
        </div>
    )
}

export default function StartChat() {
    const [formValues, setformValues] = useState({
        username: "",
    });
    const [isChecked, setisChecked] = useState(false)
    const [loading, setloading] = useState(false);
    const [data, setData] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([]);

    const navigate = useNavigate()

    function fetchUser(e) {
        const query = formValues.username;
        setloading(true)
        if (query.length > 2) {
            searchUser(query, 1).then((res) => {
                setData(res.data.data)
                setloading(false)
            }).catch(err => {
                console.log(err.response.data);
                setloading(false)
            })
        } else if (query.length === 0) {
            setData([])
        }
    }

    function toggleUserSelection(user) {
        setSelectedUsers((prevSelected) => {
            if (prevSelected.some((u) => u._id === user._id)) {
                // Remove user if already selected
                return prevSelected.filter((u) => u._id !== user._id);
            }
            // Add user if not already selected
            return [...prevSelected, user];
        });
    }

    function handleClick(params) {
        chatRoomExist(selectedUsers[0]._id).then((res) => {
            if (res.data.data) {
                navigate(`/chat/room/${res.data.data._id}`)
            } else {
                navigate(`/chat/user/${selectedUsers[0]._id}`)
            }
        })
    }

    useEffect(() => {
        fetchUser()
    }, [formValues])

    return (
        <div
        className="flex justify-between flex-col h-[100%]"
        >
            <div className="fixed-bg p-3" >
                <h4
                    className="small-text-large-weight"
                >
                    New Chat
                </h4>
            </div>
            <div className="flex justify-center flex-1"
            >
                <div className="my-4 w-[50%]">
                    <Basicinput
                        setFormValues={setformValues}
                        name={"username"}
                        value={formValues.username}
                        placeHolder={"Type username(s)"}
                    />
                    <h4
                        className="small-text-small-weight mx-[23px!important] my-[10px!important] "
                    >
                        Search for people username and chat with them.
                    </h4>
                    <div
                        className="secondary-bg py-2 px-3 rounded-lg "
                    >
                        {data.length === 0 ?
                            <>
                                <div>
                                    <h4
                                        className="small-text-large-weight"
                                    >
                                        Suggested
                                    </h4>
                                </div>
                                <div>
                                    {/* <UserAddCard /> */}
                                </div>
                            </>
                            :
                            <div>
                                {
                                    data.map((item, key) => (
                                        <UserAddCard key={key} data={item} isSelected={selectedUsers.some((u) => u._id === item._id)} onToggle={toggleUserSelection} />
                                    ))
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div
            className="flex flex-row-reverse p-4 gap-3"
            >{
                    selectedUsers.length < 2 ?
                        <BigButton
                            className={'accent-bg text-[#fff] rounded-[30px!important] px-3 py-2'}
                            title={"Start Chat"}
                            onClick={handleClick}
                        />
                        :
                        <BigButton
                            title={"Start Group Chat"}
                            className={'accent-bg text-[#fff] rounded-[30px!important] px-3 py-2'}

                        />
                }
                <BigButton
                    className={'secondary-bg rounded-[30px!important] px-3 py-2'}
                    title={"cancel"}
                />
            </div>
        </div>
    );
}
