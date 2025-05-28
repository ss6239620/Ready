import React, { useState } from "react";
import { darkColorTheme } from "../../../constant";
import BigButton from "../../../utils/buttons/BigButton";
import { IoIosArrowRoundBack, IoIosTrendingUp } from "react-icons/io";
import Basicinput from "../../../utils/input/Basicinput";
import "../../../asset/css/Signup.css";
import { signup } from "../../../services/auth";
import { useUser } from '../../../Context/UserContext'
import { useSignUp } from "../../../hooks/authHook";
import FailAlert from "../../../utils/Alert/FailAlert";

function NameTags({ title, onClick }) {
    return (
        <div
            onClick={onClick}
            className="border rounded-2xl cursor-pointer"
        >
            <p className="medium-text-normal-weight px-4 py-2" >{title}</p>
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
    const [disabled, setdisabled] = useState(false)
    const { user, setUser, logout } = useUser()

    const { mutate, isPending, isError, error } = useSignUp();

    if (!isOpen) return null;

    const handleOverlayClick = (event) => {
        // Close modal only if clicking on the overlay, not the modal content
        if (event.target === event.currentTarget) {
            setModal(false);
        }
    };

    function handleClick(params) {
        const formData = new FormData()
        formData.append('email', formValues.email);
        formData.append('password', formValues.password);
        formData.append('username', formValues.username);
        formData.append('identity', formValues.identity);
        formData.append('interests', formValues.interests);
        formData.append('profile_avtar', formValues.profileAvtar);
        // setModal(false)
        mutate(formData);
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
            className="modal-overlay div-center-justify-center"
            onClick={handleOverlayClick}
        >
            <div
                className="modal-content flex justify-between h-[80%] flex-col "
            >
                {isError && <FailAlert title={error} />}
                {/* Modal Header (Back Button) */}
                <div
                    onClick={handlePrevious}
                >
                    <IoIosArrowRoundBack className="back-button" size={40} />
                </div>

                {/* Scrollable Content Area */}
                <div className="p-7 flex-1 overflow-y-auto" >
                    <h2 className="large-text-large-weight mx-[0px!important] my-3">Interests</h2>
                    <div>
                        <p className="medium-text-normal-weight">
                            Pick things you'd like to see in your home feed.
                        </p>
                    </div>
                    <div>
                        <div className="div-center" >
                            <IoIosTrendingUp size={20} />
                            <h4 className="large-text-large-weight mx-[10px!important]">Trending</h4>
                        </div>
                        <div
                            className="flex flex-wrap gap-y-3 gap-x-1"
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
                <div className="px-8" >
                    <BigButton
                        title={"Finish"}
                        disabled={isDisabled}
                        className={`w-full rounded-[50px!important] ${isDisabled ? 'bg-[var(--divider)]' : 'bg-[var(--teritory)]'}`}
                        onClick={handleClick}
                        loading={isPending}
                    />
                </div>
            </div>
        </div>
    );
}
