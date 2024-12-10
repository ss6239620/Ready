import React from "react";
import { darkColorTheme } from "../../../constant";
import BigButton from "../../../utils/buttons/BigButton";
import { IoIosArrowRoundBack } from "react-icons/io";
import Basicinput from "../../../utils/input/Basicinput";
import '../../../asset/css/Signup.css'
import CircularFileInput from "../../../utils/input/CircularFileInput";


export default function PasswordStage({ isOpen, setModal, setNextModal, setPreviousModal, formValues, setFormValues }) {
    if (!isOpen) return null;

    const handleOverlayClick = (event) => {
        // Close modal only if clicking on the overlay, not the modal content
        if (event.target === event.currentTarget) {
            setModal(false);
        }
    };

    function handleClick(params) {
        setModal(false)
        setNextModal(true)
    }

    function handlePrevious() {
        setModal(false); // Close the current modal
        setPreviousModal(true); // Go back to the previous modal (e.g., EmailStage)
    }

    const isDisabled = !formValues.username || !formValues.password;

    const setProfileAvatar = (file) => {
        setFormValues((prev) => ({
            ...prev,
            profileAvtar: file,
        }));
    };

    return (
        <div
            className="modal-overlay"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            onClick={handleOverlayClick}
        >
            <div
                className="modal-content"
                style={{
                    height: '80%', display: 'flex',  // Use flexbox for layout
                    flexDirection: 'column',  // Stack elements vertically
                    justifyContent: 'space-between',  // Distribute space between items, pushing the button to the bottom
                }}
            >
                <div>
                    <div style={{}} onClick={handlePrevious}>
                        <IoIosArrowRoundBack className="back-button" size={40} />
                    </div>
                    <div style={{ paddingInline: 40 }}>
                        <h2 style={{ marginBlock: 10 }}>Create your username and password</h2>
                        <div>
                            <a style={{ fontSize: 15 }}>
                                Reddit is anonymous, so your username is what you’ll go by here. Choose wisely—because once you get a name, you can’t change it.
                            </a>
                        </div>
                        <CircularFileInput file={formValues.profileAvtar} setFile={setProfileAvatar} />
                        <Basicinput
                            placeHolder={"Username"}
                            style={{ marginBlock: 20 }}
                            value={formValues.username}
                            setFormValues={setFormValues}
                            name="username"
                        />
                        <Basicinput
                            placeHolder={"Password"}
                            style={{ marginBlock: 20 }}
                            value={formValues.password}
                            setFormValues={setFormValues}
                            name="password"
                        />
                        <div style={{ marginBottom: 30 }}>
                            <a >Alredy A Member? </a>
                            <span style={{ color: "#648EFC", cursor: "pointer" }}>
                                Log In
                            </span>
                        </div>
                    </div>
                </div>
                <div style={{ paddingInline: 30 }}>
                    <BigButton
                        title={"Continue"}
                        disabled={isDisabled}
                        style={{
                            background: "red",
                            borderRadius: 50,
                            background: isDisabled ? "grey" : "red",
                        }}
                        onClick={handleClick}
                    />
                </div>
            </div>
        </div>

    );
}
