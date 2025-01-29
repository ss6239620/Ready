import React from "react";
import { darkColorTheme } from "../../../constant";
import BigButton from "../../../utils/buttons/BigButton";
import { IoIosArrowRoundBack } from "react-icons/io";
import Basicinput from "../../../utils/input/Basicinput";
import '../../../asset/css/Signup.css'

export default function AboutStage({ isOpen, setModal, setNextModal, setPreviousModal, formValues, setFormValues }) {
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

    const isDisabled = !formValues.identity;


    return (
        <div
            className="modal-overlay div-center-justify-center "
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
                        <h2 className="large-text-large-weight">About you</h2>
                        <div>
                            <a className="medium-text-normal-weight secondary-text]">
                                Tell us about yourself to improve your recommendations and ads.
                            </a>
                        </div>
                        <div className="mx-[30px] text-center ">
                            <a >How do you identify? </a>
                        </div>
                        <div className="px-5" >
                            <BigButton onClick={() => setFormValues({ ...formValues, identity: "Woman" })} title={'Woman'} className={'secondary-bg rounded-[50px!important] my-2 '}  />
                            <BigButton onClick={() => setFormValues({ ...formValues, identity: "Man" })} title={'Man'} className={'secondary-bg rounded-[50px!important] my-2 '}  />
                            <BigButton onClick={() => setFormValues({ ...formValues, identity: "Non-binary" })} title={'Non-binary'}className={'secondary-bg rounded-[50px!important] my-2 '}  />
                            <BigButton onClick={() => setFormValues({ ...formValues, identity: "Prefer not to say" })} title={'I prefer not to say'}className={'secondary-bg rounded-[50px!important] my-2 '}  />
                        </div>
                    </div>
                </div>
                <div className="px-7" >
                    <BigButton
                        title={"Continue"}
                        disabled={isDisabled}
                        className={`rounded-[50px!important] ${isDisabled ?'bg-[var(--divider)]':'bg-[var(--teritory)]' }`}
                        onClick={handleClick}
                    />
                </div>
            </div>
        </div>
    );
}
