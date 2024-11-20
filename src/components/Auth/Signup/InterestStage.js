import React, { useState } from "react";
import { darkColorTheme } from "../../../constant";
import BigButton from "../../../utils/buttons/BigButton";
import { IoIosArrowRoundBack, IoIosTrendingUp } from "react-icons/io";
import Basicinput from "../../../utils/input/Basicinput";
import "../../../asset/css/Signup.css";
import { signup } from "../../../services/auth";
import { useUser } from '../../../Context/UserContext'

function NameTags({ title, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{
                border: `1px ${darkColorTheme.divider} solid`,
                borderRadius: 20,
            }}
        >
            <p style={{ paddingInline: 15, paddingBlock: 8, margin: 0 }}>{title}</p>
        </div>
    );
}

export default function InterestStage({
    isOpen,
    setModal,
    setPreviousModal,
    formValues,
    setFormValues,
}) {
    const { user, setUser, logout } = useUser()
    const [error, setError] = useState('')

    if (!isOpen) return null;

    const handleOverlayClick = (event) => {
        // Close modal only if clicking on the overlay, not the modal content
        if (event.target === event.currentTarget) {
            setModal(false);
        }
    };

    function handleClick(params) {
        // setModal(false)
        signup(formValues.email, formValues.username, formValues.password, formValues.identity, formValues.interests).then((res) => {
            setUser(res.data.data);
            localStorage.setItem("user", JSON.stringify(res.data.data));

            setModal(false)
            window.location.reload()
        }).catch((err) => {
            console.log(err.response.data.error)
        })
    }

    function handlePrevious() {
        setModal(false); // Close the current modal
        setPreviousModal(true); // Go back to the previous modal (e.g., EmailStage)
    }

    function handleInterest(interest) {
        setFormValues((prevState) => {
            const newInterests = prevState.interests.includes(interest)
                ? prevState.interests.filter((item) => item !== interest) // Remove interest if already selected
                : [...prevState.interests, interest]; // Add interest if not already selected
            return { ...prevState, interests: newInterests };
        });
    }
    const isDisabled = formValues.interests.length === 0;

    return (
        <div
            className="modal-overlay"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "fixed", // Make sure modal is centered and stays in place
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: to add a dark overlay
            }}
            onClick={handleOverlayClick}
        >
            <div
                className="modal-content"
                style={{
                    height: "80%", // Set height of modal
                    display: "flex",
                    flexDirection: "column", // Stack content vertically
                    justifyContent: "space-between", // Space between header, content, and button
                    overflow: "hidden", // Prevent overflowing outside the modal
                    borderRadius: "10px", // Optional: for rounded corners
                }}
            >
                {/* Modal Header (Back Button) */}
                <div
                    onClick={handlePrevious}
                    style={{
                        padding: "5px 0px",
                        borderBottom: `1px ${darkColorTheme.divider} solid`,
                    }}
                >
                    <IoIosArrowRoundBack className="back-button" size={40} />
                </div>

                {/* Scrollable Content Area */}
                <div style={{ padding: "5px 40px", flex: 1, overflowY: "auto" }}>
                    <h2 style={{ marginBlock: 5 }}>Interests</h2>
                    <div>
                        <p style={{ fontSize: 15, margin: 0 }}>
                            Pick things you'd like to see in your home feed.
                        </p>
                    </div>
                    <div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <IoIosTrendingUp size={20} />
                            <h4 style={{ marginInline: 10 }}>Trending</h4>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                rowGap: 10,
                                columnGap: 5,
                            }}
                        >
                            {[1, 2, 3, 4, 5, 6].map((data, index) => (
                                <NameTags
                                    onClick={() => handleInterest(`intrest ${data}`)}
                                    title={`intrest ${data}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div style={{ paddingInline: 30 }}>
                    <BigButton
                        title={"Finish"}
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
