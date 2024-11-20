import React, { useState } from "react";
import Search from "../../utils/Search";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { RiAccountCircleFill, RiMenuFill } from "react-icons/ri";
import "../../asset/css/Navbar.css";
import Sidebar from "./Sidebar";
import BigButton from "../../utils/buttons/BigButton";
import Login from "../Auth/Login/Login";
import EmailStage from "../Auth/Signup/EmailStage";
import PasswordStage from "../Auth/Signup/PasswordStage";
import AboutStage from "../Auth/Signup/AboutStage";
import InterestStage from "../Auth/Signup/InterestStage";
import { useUser } from "../../Context/UserContext";
import { test } from "../../services/auth";
import { useNavigate } from "react-router-dom";

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
        interests: []
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loginModal, setLoginModal] = useState(false);
    const [emailStageModal, setEmailStageModal] = useState(false);
    const [passwordStageModal, setPasswordStageModal] = useState(false);
    const [aboutStageModal, setAboutStageModal] = useState(false);
    const [interestStageModal, setInterestStageModal] = useState(false);

    const { user, logout } = useUser();

    const navigate=useNavigate()

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    function test1(params) {
        test().then(res=>console.log('yes')
        ).catch(err=>console.log('error')
        )
    }

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
                    <Search />
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
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginInline: 10 }}>
                            <IoChatbubbleEllipsesOutline size={25} />
                        </div>
                        <div onClick={()=>navigate(`/createpost`)} style={{cursor:'pointer', marginInline: 10, display: 'flex', alignItems: 'center' }}>
                            <FaPlus size={25} style={{ marginInline: 10 }} />
                            <span>Create</span>
                        </div>
                        <div onClick={test1} style={{ marginInline: 10 }}>
                            <IoIosNotifications size={25} />
                        </div>
                        <div onClick={logout} style={{ marginInline: 10 }}>
                            <RiAccountCircleFill size={25} />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
