import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ButtonWIthBorder from "../../utils/buttons/ButtonWIthBorder";
import { FaPlus } from "react-icons/fa6";
import { IoChevronBackOutline, IoChevronDownSharp, IoChevronUpSharp, IoNotificationsSharp, IoSunnyOutline } from "react-icons/io5";
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
import IconButton from "../../utils/buttons/IconButton";
import { IoMdClose } from "react-icons/io";
import Underline from "../../utils/Underline";
import { MdOutlineChevronRight, MdOutlineModeNight } from "react-icons/md";
import ToggleInput from "../../utils/input/ToggleInput";
import { useUser } from "../../Context/UserContext";
import { TribeAppearenceContent } from '../../asset/data/searchParamsData'
import { AppearanceBanner, AppearanceBaseColor, AppearanceIcon, AppearanceColor, DiscardChanges } from "./TribeAppearenceContent";

export default function TribeHomePage({ }) {
    const [tribeDetail, setTribeDetail] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [posts, setPosts] = useState([]);
    const [isJoined, setIsJoined] = useState(false);
    const [userCreatedTribe, setUserCreatedTribe] = useState(false);
    const [tribeStylingValue, setTribeStylingValue] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isStyling, setIsStyling] = useState(searchParams.get("styling") || false);
    const [discardAppearanceModal, setDiscardAppearanceModal] = useState(false)
    const [appearanceChangesValues, setAppearanceChangesValues] = useState({
        icon: {
            image: null,
            imagefile: null,
            isUpdated: false
        },
        banner: {
            image: null,
            imagefile: null,
            isUpdated: false
        },
        key_color: {
            colorHex: "#000000",
            isUpdated: false
        },
        base_color: {
            colorHex: "#000000",
            isUpdated: false
        },
        pinned_post_color: {
            colorHex: "#000000",
            isUpdated: false
        },
    });

    function handleUpdateAppearance(name, newValues) {
        setAppearanceChangesValues((prev) => ({
            ...prev,
            [name]: {
                ...prev[name],
                ...newValues,
            },
        }));
    }

    const { id } = useParams();

    const { switchTheme, theme } = useUser();

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
            handleUpdateAppearance('icon', {
                image: `${FILE_URL}/${res.data.data.tribeProfileImage}`,
                isUpdated: false,
            })
            handleUpdateAppearance('banner', {
                image: `${FILE_URL}/${res.data.data.tribeBannerImage}`,
                isUpdated: false,
            })
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

    const checkAppearanceCondition = (appearanceChangesValues.icon.isUpdated || appearanceChangesValues.banner.isUpdated ||
        appearanceChangesValues.key_color.isUpdated || appearanceChangesValues.base_color.isUpdated ||
        appearanceChangesValues.pinned_post_color.isUpdated);

    function openDiscardModal() {
        if (checkAppearanceCondition) {
           return setDiscardAppearanceModal(true);
        }
        setIsStyling(false);
    }

    return (
        <div className='main-content px-[6%] py-5 '>
            {discardAppearanceModal && <DiscardChanges setModal={setDiscardAppearanceModal} />}
            {isStyling &&
                <div className="fixed bottom-0 z-[10000] left-8 bg-[var(--secondary)] w-[25%] p-2 rounded-ss-2xl rounded-tr-2xl ">
                    <div className="div-center-justify px-4 py-2">
                        <div className="div-center gap-1">
                            {tribeStylingValue !== "" && <IconButton onClick={() => setTribeStylingValue('')} size={18} Icon={IoChevronBackOutline} />}
                            <h3 className="large-text-large-weight">{tribeStylingValue !== "" ? tribeStylingValue : "Tribe appearance"}</h3>
                        </div>
                        <div className="div-center gap-1">
                            <IconButton
                                size={18}
                                Icon={isCollapsed ? IoChevronUpSharp : IoChevronDownSharp}
                                onClick={() => setIsCollapsed(prev => !prev)}
                            />
                            <IconButton onClick={openDiscardModal} size={18} Icon={IoMdClose} />
                        </div>
                    </div>
                    <div
                        style={{
                            maxHeight: isCollapsed ? '0px' : '1000px',
                            overflow: 'hidden',
                            transition: 'max-height 0.5s ease',
                        }}
                    >
                        <Underline sizeInPx={2} />
                        {tribeStylingValue === 'icon' && <AppearanceIcon name='icon' values={appearanceChangesValues.icon} handleChangeValues={handleUpdateAppearance} />}
                        {tribeStylingValue === 'banner' && <AppearanceBanner name='banner' values={appearanceChangesValues.banner} handleChangeValues={handleUpdateAppearance} />}
                        {tribeStylingValue === 'key_color' && <AppearanceColor name='key_color' title={'Changes the color of the Join button and links.'} values={appearanceChangesValues.key_color} handleChangeValues={handleUpdateAppearance} />}
                        {tribeStylingValue === 'base_color' && <AppearanceColor name='base_color' title={'Shades UI elements like buttons, borders, and the background color.'} values={appearanceChangesValues.base_color} handleChangeValues={handleUpdateAppearance} />}
                        {tribeStylingValue === 'pinned_post_color' && <AppearanceColor name='pinned_post_color' title={'Changes the color of pinned posts.'} values={appearanceChangesValues.pinned_post_color} handleChangeValues={handleUpdateAppearance} />}
                        {tribeStylingValue === '' &&
                            <div className="px-4">
                                {
                                    TribeAppearenceContent.map((item, key) => (
                                        <div key={key} className="div-center-justify cursor-pointer my-2 hover:text-[var(--text-primary)] text-[var(--text-secondary)]" onClick={() => setTribeStylingValue(item.id)}>
                                            <a className="medium-text-normal-weight ">{item.title}</a>
                                            <div className="div-center gap-1">
                                                {appearanceChangesValues[item.id].isUpdated &&
                                                    <a className="small-text-small-weight bg-[var(--partial-secondary)] px-[8px] rounded-2xl ">Updated</a>}
                                                <IconButton size={20} Icon={MdOutlineChevronRight} />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        }
                        <Underline sizeInPx={2} />
                        <div className="div-center-justify px-4 py-2">
                            {theme === 'dark' ?
                                < div className="div-center gap-1">
                                    <IconButton size={20} Icon={IoSunnyOutline} />
                                    <a className="medium-text-normal-weight">Switch to light mode</a>
                                </div>
                                :
                                <div className="div-center gap-1">
                                    <IconButton size={20} Icon={MdOutlineModeNight} />
                                    <a className="medium-text-normal-weight">Switch to dark mode</a>
                                </div>
                            }
                            <ToggleInput selected={theme === 'dark'} onChange={() => switchTheme()} />
                        </div>
                        {checkAppearanceCondition && tribeStylingValue === '' &&
                            <div className='div-center-justify gap-3'>
                                <BigButton onClick={openDiscardModal} className={'partial-secondary-bg my-4 px-4 rounded-[20px!important] w-full justify-center  '} title={'Cancel'} />
                                <BigButton className={'accent-bg px-6 rounded-[20px!important] justify-center w-full '} title={'Save'} />
                            </div>
                        }
                    </div>
                </div>
            }
            {
                !isLoading &&
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
        </div >
    );
}
