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
import { test } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { darkColorTheme } from "../../constant";
import { FaArrowTrendUp } from "react-icons/fa6";
import { getTrendingTodayPost } from '../../services/posts'
import PostSummaryCard from '../../utils/cards/PostSummaryCard'
import IconDropDown from "../../utils/dropdown/IconDropDown";
import { profile_dropDown } from "../../asset/data/dropDownData";

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
            <div className="modal-content" style={{ width: "65%" }}>
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


    const { user, logout } = useUser();

    const navigate = useNavigate()

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



    return (
        <div>
            <div
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
                    borderBottom: "0.1px solid #FFFFFF19",
                    zIndex: 10, // Ensure navbar stays on top
                    backgroundColor: "#101010",
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

                <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                        className="navbar-menu"
                        style={{ paddingRight: 15 }}
                        onClick={() => openModal()}
                    >
                        <RiMenuFill size={30} />
                    </div>
                    <div style={{ width: "45px", height: "45px" }}>
                        <img
                            src={require("../../asset/img/logo.png")}
                            alt=""
                            style={{
                                width: "90%",
                                height: "90%",
                                objectFit: "cover",
                                borderRadius: "50%", // Optional: makes the image circular
                            }}
                        />
                    </div>
                    <div
                        className="navbar-title"
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
                <div style={{ display: "flex" }}>
                    <Search clicked={searchClicked} setclicked={setSearchClicked}>
                        {!loading &&
                            <div style={{ position: 'relative' }}>
                                <div style={{ background: '#121212', position: 'absolute', paddingBlock: 15, width: '100%', maxHeight: "calc(100vh - 100px)", overflowY: 'auto', borderBottomLeftRadius: 20 }}>
                                    <Underline style={{ marginBlock: 10 }} />
                                    <div style={{ paddingInline: 15 }}>
                                        <div className="div-center" style={{}}>
                                            <IconButton Icon={FaArrowTrendUp} size={15} />
                                            <h5 style={{ marginBlock: 0, fontWeight: 400 }}>TRENDING TODAY</h5>
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
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ marginInline: 10 }}>
                            <BigButton
                                style={{ background: "red" }}
                                title={"Log in"}
                                onClick={() => setLoginModal(true)}
                            />
                        </div>
                        <div style={{ marginInline: 10 }}>
                            <BigButton
                                style={{ background: "red" }}
                                title={"Sign up"}
                                onClick={() => setEmailStageModal(true)}
                            />
                        </div>
                    </div>
                )}

                {user && (
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                        <div style={{ marginInline: 10,cursor:'pointer' }}>
                            <IoChatbubbleEllipsesOutline size={25} />
                        </div>
                        <div onClick={() => navigate(`/createpost`)} style={{ cursor: 'pointer', marginInline: 10, display: 'flex', alignItems: 'center' }}>
                            <FaPlus size={25} style={{ marginInline: 10 }} />
                            <span>Create</span>
                        </div>
                        <div style={{ marginInline: 10, cursor: 'pointer' }}>
                            <IoIosNotifications size={25} />
                        </div>
                        <div style={{ marginInline: 10 }}>
                            <IconDropDown Icon={RiAccountCircleFill} childStyle={{ width: 230, right: 0, top: 50, paddingBlock: 15, paddingInline: 20 }}>
                                <div onClick={() => navigate(`user/${user.user._id}`)} className="div-center profile-dropdown" style={{ gap: 10, marginBlock: 10, cursor: 'pointer' }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <img
                                            src={require('../../asset/img/logo.png')}
                                            alt="communities-logo"
                                            style={{
                                                width: "35px", // Fixed size
                                                height: "35px", // Fixed size
                                                objectFit: "cover", // Ensures the aspect ratio is preserved
                                                borderRadius: "50%", // Circular shape
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h5
                                            className="profile-dropdown-text"
                                            style={{
                                                marginInline: 3,
                                                marginBlock: 0,
                                                fontSize: 14,
                                                fontWeight: 500,
                                            }}
                                        >
                                            View Profile
                                        </h5>
                                        <h5
                                            style={{
                                                marginInline: 3,
                                                marginBlock: 0,
                                                fontSize: 12,
                                                color: darkColorTheme.secondaryTextColor,
                                                fontWeight: 400,
                                            }}
                                        >
                                            u/{user.user.username}
                                        </h5>
                                    </div>
                                </div>
                                <div>
                                    {profile_dropDown.map((item, key) => (
                                        <div onClick={item.id === 'log_out' ? logout : null} className="div-center" key={key} style={{ gap: 10, marginBlock: 10, cursor: 'pointer' }}>
                                            <IconButton Icon={item.icon} size={25} />
                                            <div>
                                                <h5
                                                    className="profile-dropdown-text"
                                                    style={{
                                                        marginInline: 3,
                                                        marginBlock: 0,
                                                        fontSize: 14,
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {item.title}
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
