import React, { useEffect, useState } from "react";
import { darkColorTheme, FILE_URL } from "../../constant";
import BigButton from "../../utils/buttons/BigButton";
import Basicinput from "../../utils/input/Basicinput";
import Checkbox from "../../utils/input/Checkbox";
import { searchUser } from "../../services/auth";
import {useNavigate} from 'react-router-dom'
import { chatRoomExist } from "../../services/chat";


function UserAddCard({ data, isSelected, onToggle }) {
    return (
        <div
            className="div-center"
            style={{ justifyContent: "space-between", paddingInline: 15 }}
        >
            <div className="div-center" style={{ gap: 10, marginBlock: 15 }}>
                <img
                    src={`${FILE_URL}/${data?.profile_avtar}`}
                    alt=""
                    style={{
                        width: "30px",
                        height: "30px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        display: "block",
                    }}
                />
                <a
                    style={{
                        marginInline: 3,
                        marginBlock: 5,
                        fontSize: 13.5,
                        fontWeight: 400,
                        color: darkColorTheme.primaryTextColor,
                    }}
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

    const navigate=useNavigate()

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
        chatRoomExist(selectedUsers[0]._id).then((res)=>{
            if(res.data.data){
                navigate(`/chat/room/${res.data.data._id}`)
            }else{
                navigate(`/chat/user/${selectedUsers[0]._id}`)
            }
        })
    }

    useEffect(() => {
        fetchUser()
    }, [formValues])

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
            }}
        >
            <div style={{ background: "black", padding: 10 }}>
                <h4
                    style={{
                        marginInline: 3,
                        marginBlock: 5,
                        fontSize: 13.5,
                        fontWeight: 700,
                        color: darkColorTheme.primaryTextColor,
                    }}
                >
                    New Chat
                </h4>
            </div>
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: darkColorTheme.divider,
                }}
            >
                <div style={{ marginBlock: 15, width: "50%" }}>
                    <Basicinput
                        setFormValues={setformValues}
                        name={"username"}
                        value={formValues.username}
                        placeHolder={"Type username(s)"}
                        style={{ backgroundColor: darkColorTheme.secondaryColor }}
                    />
                    <h4
                        style={{
                            marginInline: 23,
                            marginBlock: 10,
                            fontSize: 13.5,
                            fontWeight: 400,
                            color: darkColorTheme.primaryTextColor,
                        }}
                    >
                        Search for people username and chat with them.
                    </h4>
                    <div
                        style={{
                            backgroundColor: darkColorTheme.secondaryColor,
                            paddingInline: 10,
                            paddingBlock: 8,
                            borderRadius: 10,
                        }}
                    >
                        {data.length === 0 ?
                            <>
                                <div>
                                    <h4
                                        style={{
                                            marginInline: 2,
                                            marginBlock: 3,
                                            fontSize: 13.5,
                                            fontWeight: 700,
                                            color: darkColorTheme.primaryTextColor,
                                        }}
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
                style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    padding: 15,
                    gap: 10,
                }}
            >{
                    selectedUsers.length < 2 ?

                        <BigButton
                            title={"Start Chat"}
                            onClick={handleClick}
                            style={{
                                borderRadius: 30,
                                paddingInline: 10,
                                paddingBlock: 8,
                                background: darkColorTheme.accentColor,
                                padding: "0",
                            }}
                        />
                        :
                        <BigButton
                            title={"Start Group Chat"}
                            style={{
                                borderRadius: 30,
                                paddingInline: 10,
                                paddingBlock: 8,
                                background: darkColorTheme.accentColor,
                                padding: "0",
                            }}
                        />
                }
                <BigButton
                    title={"cancel"}
                    style={{
                        borderRadius: 30,
                        paddingInline: 12,
                        paddingBlock: 8,
                        padding: "0",
                        background: darkColorTheme.divider,
                    }}
                />
            </div>
        </div>
    );
}
