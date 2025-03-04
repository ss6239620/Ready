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

    function handleMod(params) {
        localStorage.setItem("mod_tribe", JSON.stringify(id));
        navigate(`/mod/${id}/queue`)
    }

    return (
        <div className='main-content px-[6%] py-5 '>
            {!isLoading &&
                <>
                    <div className="relative">
                        <img
                            src={`${FILE_URL}/${tribeDetail.tribeBannerImage}`}
                            alt="Logo"
                            className="img-small-style w-[100%!important] h-[140px!important] rounded-[10px!important] "
                        />
                        <div
                            className="flex justify-between px-7"
                        >
                            <div
                                className="secondary-bg w-[100px] h-[100px] rounded-[50%] absolute top-[50%] div-center-justify-center "
                            >
                                <img
                                    src={`${FILE_URL}/${tribeDetail.tribeProfileImage}`}
                                    alt="Logo"
                                    className="img-small-style p-[5px] w-[100%!important] h-[100%!important] "
                                />
                            </div>
                            <div
                                className="ml-[120px] my-3"
                            >
                                <div>
                                    <h1 className='extra-large-text-extra-large-weight'>t/{tribeDetail.tribeName}</h1>
                                </div>
                            </div>
                            <div
                                className="div-center-justify my-2 ml-5 gap-4"
                            >
                                <ButtonWIthBorder onClick={handleCreatepostClick} iconSize={20} title={'Create Post'} Icon={FaPlus} className={'bg-[transparent!important mx-2]'} />
                                {isJoined &&
                                    <ButtonWIthBorder iconSize={20} Icon={IoNotificationsSharp} className={'bg-[transparent!important mx-2]'} />
                                }
                                {isJoined ?
                                    <ButtonWIthBorder onClick={leave_tribe} title={'Joined'} className={'bg-[transparent!important mx-2]'} />
                                    :
                                    <ButtonWIthBorder onClick={join_tribe} title={'Join'} className={'bg-[transparent!important mx-2]'} />
                                }
                                {userCreatedTribe &&
                                    <BigButton className={'accent-bg text-[#fff]  border-radius-large '} onClick={handleMod} title={'Mod Tools'} />
                                }
                                <ButtonWIthBorder iconSize={25} Icon={TbDots} className={'bg-[transparent!important] mx-2'} />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between my-10" >
                        <div className="flex-[1_0_43%] px-2 ">
                            <div className="border-bottom my-4" />
                            <div>
                                {posts.map((item, index) => (
                                    <PostCard key={index} data={item} tribeInfo={tribeDetail} hoverEfftect />
                                ))}
                            </div>
                        </div>
                        <div className="sticky top-[70px] left-0 self-start w-[25%] ">
                            <TribeSideInfo tribeDetail={tribeDetail} />
                        </div>
                    </div>
                </>
            }
        </div>
    );
}
