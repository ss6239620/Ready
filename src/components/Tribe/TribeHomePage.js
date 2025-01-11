import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonWIthBorder from "../../utils/buttons/ButtonWIthBorder";
import { FaPlus } from "react-icons/fa6";
import { IoNotificationsSharp } from "react-icons/io5";
import { TbDots } from "react-icons/tb";
import { getTribeDetails, isJoinedTribe, isUserCreatedTribe, joinTribe, leaveTribe } from '../../services/tribe'
import { GiCakeSlice } from "react-icons/gi";
import { darkColorTheme, FILE_URL } from "../../constant";
import { BsGlobe2 } from "react-icons/bs";
import { LuDot } from "react-icons/lu";
import { getAllPostOfTribe } from "../../services/posts";
import PostCard from "../../utils/cards/PostCard";
import TribeSideInfo from "./TribeSideInfo";
import BigButton from "../../utils/buttons/BigButton";

export default function TribeHomePage({ }) {
    const [tribeDetail, setTribeDetail] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [posts, setPosts] = useState([]);
    const [isJoined, setIsJoined] = useState(false);
    const [userCreatedTribe, setUserCreatedTribe] = useState(false)

    const { id } = useParams();

    const navigate = useNavigate()

    function isUserJoinedTribe(params) {
        isJoinedTribe(id).then((res) => {
            setIsJoined(res.data.data)
        }).catch((err) => {
            console.log(err);
            setIsLoading(true);
        });
    }

    function fetchTribeDetail(params) {
        getTribeDetails(id).then((res) => {
            document.title = `${res.data.data.tribeName}`
            setTribeDetail(res.data.data);
            setIsLoading(false);
        })
            .catch((err) => {
                console.log(err);
                setIsLoading(true);
            });
    }

    useEffect(() => {
        fetchTribeDetail();
        isUserJoinedTribe();
        user_created_tribe();
    }, [id])

    useEffect(() => {
        getAllPostOfTribe(id).then((res) => {
            setPosts(res.data.data);
            setIsLoading(false);
        })
            .catch((err) => {
                console.log(err);
                setIsLoading(true);
            });
    }, [id])

    function join_tribe(params) {
        joinTribe(id).then((res) => {
            setIsJoined(true)
        }).catch((err) => {
            console.log(err);
        });
    }

    function leave_tribe(params) {
        leaveTribe(id).then((res) => {
            setIsJoined(res.data.data)
        }).catch((err) => {
            console.log(err);
        });
    }

    function user_created_tribe(params) {
        isUserCreatedTribe(id).then((res) => {
            setUserCreatedTribe(res.data.data)
        }).catch((err) => {
            console.log(err);
        });
    }

    function handleCreatepostClick() {
        navigate(`/createpost?id=${tribeDetail._id}`)
    }

    return (
        <div className='main-content' style={{ paddingInline: "6%", paddingBlock: 20, }}>
            {!isLoading &&
                <>
                    <div>
                        <div style={{ width: "100%", height: 140 }}>
                            <img
                                src={`${FILE_URL}/${tribeDetail.tribeBannerImage}`}
                                alt="Logo"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                    borderRadius: 10,
                                }}
                            />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                paddingInline: 30,
                                justifyContent: "space-between",
                            }}
                        >
                            <div
                            className="secondary-bg"
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: "50%",
                                    position: "absolute",
                                    top: "25%",
                                    display: "flex",
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <img
                                    src={`${FILE_URL}/${tribeDetail.tribeProfileImage}`}
                                    alt="Logo"
                                    style={{
                                        width: "90%",
                                        height: "90%",
                                        objectFit: "cover",
                                        display: "block", // Removes extra space under image
                                        borderRadius: "50%",
                                        padding: 3,
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    marginLeft: "120px", // Push the other content away from the image
                                    marginBlock: 10
                                }}
                            >
                                <div>
                                    <h1 style={{ marginBlock: 0 }}>t/{tribeDetail.tribeName}</h1>
                                </div>
                            </div>
                            <div
                                style={{
                                    marginLeft: "20px", // Adjust for space between content
                                    marginBlock: 10,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <ButtonWIthBorder onClick={handleCreatepostClick} iconSize={20} title={'Create Post'} Icon={FaPlus} style={{ background: 'transparent', marginInline: 10 }} />
                                {isJoined &&
                                    <ButtonWIthBorder iconSize={20} Icon={IoNotificationsSharp} style={{ background: 'transparent', marginInline: 10, }} />
                                }
                                {isJoined ?
                                    <ButtonWIthBorder onClick={leave_tribe} title={'Joined'} style={{ background: 'transparent', marginInline: 10, }} />
                                    :
                                    <ButtonWIthBorder onClick={join_tribe} title={'Join'} style={{ background: 'transparent', marginInline: 10, }} />
                                }
                                {userCreatedTribe &&
                                    <BigButton className={'accent-bg'} onClick={()=>navigate(`/mod/${id}/queue`)} title={'Mod Tools'} style={{  marginInline: 10, borderRadius: 30 ,color:'white'}} />
                                }
                                <ButtonWIthBorder iconSize={25} Icon={TbDots} style={{ background: 'transparent', marginInline: 10, }} />
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBlock: 40 }}>
                        <div style={{ flex: '1 0 43%', paddingInline: 10 }}>
                            <div style={{ borderBottom: "0.01px solid #FFFFFF55", marginBlock: 15 }} />
                            <div>
                                {posts.map((item, index) => (
                                    <PostCard key={index} data={item} tribeInfo={tribeDetail} hoverEfftect />
                                ))}
                            </div>
                        </div>
                        <div style={{ position: 'sticky', top: 70, left: 0, alignSelf: 'flex-start', width: '25%' }}>
                            <TribeSideInfo tribeDetail={tribeDetail} style={{}} />
                        </div>
                    </div>
                </>
            }
        </div>
    );
}
