import React from "react";
import { darkColorTheme } from "../../../constant";
import BigButton from "../../../utils/buttons/BigButton";
import { IoIosArrowRoundBack } from "react-icons/io";
import Basicinput from "../../../utils/input/Basicinput";
import '../../../asset/css/Signup.css'
import CircularFileInput from "../../../utils/input/CircularFileInput";
import { validatePassword, validateUserName } from "../../../utils/CommonFunction";


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

    const isDisabled = !formValues.username || !formValues.password || !formValues.profileAvtar;

    const setProfileAvatar = (file) => {
        setFormValues((prev) => ({
            ...prev,
            profileAvtar: file,
        }));
    };

    return (
        <div
            className="modal-overlay div-center-justify-center"
            onClick={handleOverlayClick}
        >
            <div
                className="modal-content flex justify-between h-[80%] flex-col "
            >
                <div>
                    <div onClick={handlePrevious}>
                        <IoIosArrowRoundBack className="back-button" size={40} />
                    </div>
                    <div className="px-10" >
                        <h2 className="large-text-large-weight mx-[0px!important]">Create your username and password</h2>
                        <div>
                            <a className="medium-text-normal-weight mx-[0px!important] my-[8px!important]" >
                                Reddit is anonymous, so your username is what you’ll go by here. Choose wisely—because once you get a name, you can’t change it.
                            </a>
                        </div>
                        <CircularFileInput file={formValues.profileAvtar} setFile={setProfileAvatar} />
                        <Basicinput
                            placeHolder={"Username"}
                            className={'my-5'}
                            value={formValues.username}
                            setFormValues={setFormValues}
                            name="username"
                            validationFunc={validateUserName}
                        />
                        <Basicinput
                            placeHolder={"Password"}
                            className={'my-5'}
                            value={formValues.password}
                            setFormValues={setFormValues}
                            name="password"
                            validationFunc={validatePassword}
                            type={'password'}
                        />
                        <div className="mb-7" >
                            <a >Alredy A Member? </a>
                            <span className={'accent-text-style cursor-pointer '}>
                                Log In
                            </span>
                        </div>
                    </div>
                </div>
                <div className="px-8">
                    <BigButton
                        title={"Continue"}
                        disabled={isDisabled}
                        className={` w-full rounded-[50px!important] ${isDisabled ?'bg-[var(--divider)]':'bg-[var(--teritory)]' }`}
                        onClick={handleClick}
                    />
                </div>
            </div>
        </div>

    );
}
