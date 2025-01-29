import React, { useEffect, useState } from "react";
import Search from "../../utils/Search";
import Underline from "../../utils/Underline";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { RiAccountCircleFill, RiMenuFill } from "react-icons/ri";
import "../../asset/css/Navbar.css";
import Sidebar from "./Sidebar";
import BigButton from "../../utils/buttons/BigButton";
import IconButton from "../../utils/buttons/IconButton";
import Login from "../Auth/Login/Login";
import EmailStage from "../Auth/Signup/EmailStage";
import PasswordStage from "../Auth/Signup/PasswordStage";
import AboutStage from "../Auth/Signup/AboutStage";
import InterestStage from "../Auth/Signup/InterestStage";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { darkColorTheme } from "../../constant";
import { FaArrowTrendUp } from "react-icons/fa6";
import { getTrendingTodayPost } from '../../services/posts'
import PostSummaryCard from '../../utils/cards/PostSummaryCard'
import IconDropDown from "../../utils/dropdown/IconDropDown";
import { profile_dropDown } from "../../asset/data/dropDownData";
import { CiLight } from "react-icons/ci";

const SideBarModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (event) => {
        // Close modal only if clicking on the overlay, not the modal content
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="w-[65%]" >
                {children}
            </div>
        </div>
    );
};

export default function Navbar() {
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
        username: '',
        identity: "",
        interests: [],
        profileAvtar: null
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loginModal, setLoginModal] = useState(false);
    const [emailStageModal, setEmailStageModal] = useState(false);
    const [passwordStageModal, setPasswordStageModal] = useState(false);
    const [aboutStageModal, setAboutStageModal] = useState(false);
    const [interestStageModal, setInterestStageModal] = useState(false);
    const [searchTrendingPost, setSearchTrendingPost] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchClicked, setSearchClicked] = useState(false)


    const { user, logout, switchTheme, theme } = useUser();

    const navigate = useNavigate();

    const ROOM_ID = localStorage.getItem('room_id');

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    function fetchTrendingTodayPost(params) {
        setLoading(true)
        getTrendingTodayPost().then((res) => {
            setSearchTrendingPost(res.data.data)
            setLoading(false)
        }).catch(err => {
            console.log(err);
        })
    }

    function closeSearchChild(params) {
        setSearchClicked(false)
    }

    useEffect(() => {
        fetchTrendingTodayPost()
    }, [])

    function handleChatNavigate(params) {
        if (ROOM_ID) {
            navigate(`/chat/room/${ROOM_ID}`)
        } else {
            navigate('/chat')
        }
    }


    function handleFucntion(id) {
        if (id === 'log_out') {
            logout();
        }
        if (id === 'dark_mode') {
            switchTheme();
        }
    }



    return (
        <div>
            <div
                className="primary-bg divider-bottom "
                style={{
                    position: "fixed", // Fix the navbar to the top
                    top: 0,
                    left: 0,
                    right: 0,
                    paddingBlock: 8,
                    paddingInline: 15,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    zIndex: 100, // Ensure navbar stays on top
                }}
            >
                <SideBarModal isOpen={isModalOpen} onClose={closeModal}>
                    <Sidebar />
                </SideBarModal>
                <Login isOpen={loginModal} setModal={setLoginModal} />
                <EmailStage
                    isOpen={emailStageModal}
                    setModal={setEmailStageModal}
                    setNextModal={setPasswordStageModal}
                    formValues={formValues}
                    setFormValues={setFormValues}
                />
                <PasswordStage
                    isOpen={passwordStageModal}
                    setModal={setPasswordStageModal}
                    setNextModal={setAboutStageModal}
                    setPreviousModal={setEmailStageModal}
                    formValues={formValues}
                    setFormValues={setFormValues}
                />
                <AboutStage
                    isOpen={aboutStageModal}
                    setModal={setAboutStageModal}
                    setNextModal={setInterestStageModal}
                    setPreviousModal={setPasswordStageModal}
                    formValues={formValues}
                    setFormValues={setFormValues}
                />
                <InterestStage
                    isOpen={interestStageModal}
                    setModal={setInterestStageModal}
                    setPreviousModal={setAboutStageModal}
                    formValues={formValues}
                    setFormValues={setFormValues}
                />

                <div className="div-center">
                    <div
                        className="navbar-menu pr-4"
                        onClick={() => openModal()}
                    >
                        <RiMenuFill size={30} />
                    </div>
                        <img
                            src={require("../../asset/img/logo.png")}
                            alt=""
                            className='img-small-style w-[45px!important] h-[45px!important]'
                        />
                    <div
                        className="navbar-title  "
                        style={{
                            paddingLeft: 10,
                            fontWeight: "bold",
                            fontSize: 25,
                            fontFamily: "ui-rounded",
                        }}
                    >
                        ready
                    </div>
                </div>
                <div className="flex" >
                    <Search clicked={searchClicked} setclicked={setSearchClicked}>
                        {!loading &&
                            <div className="relative" >
                                <div className="primary-bg absolute py-4 w-[100%] max-h-[calc(100vh_-_100px)] overflow-y-auto rounded-bl-3xl " >
                                    <Underline className={'my-3'} />
                                    <div className="px-4">
                                        <div className="div-center" >
                                            <IconButton Icon={FaArrowTrendUp} size={15} />
                                            <h5 className="large-text-normal-weight" >TRENDING TODAY</h5>
                                        </div>
                                        {searchTrendingPost.map((item, key) => (
                                            <PostSummaryCard data={item} key={key} onClick={closeSearchChild} no_of_charactor={120} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        }
                    </Search>
                </div>
                {!user && (
                    <div className="div-center" >
                        <div className="mx-3">
                            <BigButton
                                className={'bg-[var(--teritory)]'}
                                title={"Log in"}
                                onClick={() => setLoginModal(true)}
                            />
                        </div>
                        <div className="mx-3">
                            <BigButton
                                className={'bg-[var(--teritory)]'}
                                title={"Sign up"}
                                onClick={() => setEmailStageModal(true)}
                            />
                        </div>
                    </div>
                )}

                {user && (
                    <div className="div-baseline">
                        <div className="mx-3 cursor-pointer" onClick={handleChatNavigate}>
                            <IoChatbubbleEllipsesOutline size={25} />
                        </div>
                        <div onClick={() => navigate(`/createpost`)} className="mx-3 cursor-pointer div-center">
                            <FaPlus size={25} className="mx-3" />
                            <span>Create</span>
                        </div>
                        <div className="mx-3 cursor-pointer">
                            <IoIosNotifications size={25} />
                        </div>
                        <div className="mx-3">
                            <IconDropDown Icon={RiAccountCircleFill} childClassName={'w-[230px] right-0 top-[50px] py-[15px] px-5 '} >
                                <div onClick={() => navigate(`user/${user.user._id}`)} className="div-center profile-dropdown gap-3 my-3 cursor-pointer" >
                                    <img
                                        src={require('../../asset/img/logo.png')}
                                        alt="communities-logo"
                                        className="img-small-style"
                                    />
                                    <div>
                                        <h5
                                            className="profile-dropdown-text medium-text-normal-weight my-[0px!important]"
                                        >
                                            View Profile
                                        </h5>
                                        <h5
                                            className="small-text-small-weight secondary-text my-[0px!important]"
                                        >
                                            u/{user.user.username}
                                        </h5>
                                    </div>
                                </div>
                                <div>
                                    {profile_dropDown.map((item, key) => (
                                        <div className="div-center gap-3 my-3" key={key}>
                                            <IconButton onClick={() => handleFucntion(item.id)} Icon={theme === 'dark' && item.id === 'dark_mode' ? CiLight : item.icon} size={25} />
                                            <div>
                                                <h5
                                                    className="medium-text-small-weight"
                                                >
                                                    {theme === 'dark' && item.id === 'dark_mode' ? 'Light Mode' : item.title}
                                                </h5>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </IconDropDown>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
