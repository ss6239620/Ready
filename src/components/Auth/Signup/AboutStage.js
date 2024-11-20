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
                    <div onClick={handlePrevious} style={{}}>
                        <IoIosArrowRoundBack className="back-button" size={40} />
                    </div>
                    <div style={{ paddingInline: 40 }}>
                        <h2 style={{ marginBlock: 10 }}>About you</h2>
                        <div>
                            <a style={{ fontSize: 15 }}>
                                Tell us about yourself to improve your recommendations and ads.
                            </a>
                        </div>
                        <div style={{ marginBlock: 30, textAlign: 'center' }}>
                            <a >How do you identify? </a>
                        </div>
                        <div style={{ paddingInline: 20 }}>
                            <BigButton onClick={() => setFormValues({ ...formValues, identity: "Woman" })} title={'Woman'} style={{ background: '#FFFFFF19', borderRadius: 50, marginBlock: 8 }} />
                            <BigButton onClick={() => setFormValues({ ...formValues, identity: "Man" })} title={'Man'} style={{ background: '#FFFFFF19', borderRadius: 50, marginBlock: 8 }} />
                            <BigButton onClick={() => setFormValues({ ...formValues, identity: "Non-binary" })} title={'Non-binary'} style={{ background: '#FFFFFF19', borderRadius: 50, marginBlock: 8 }} />
                            <BigButton onClick={() => setFormValues({ ...formValues, identity: "Prefer not to say" })} title={'I prefer not to say'} style={{ background: '#FFFFFF19', borderRadius: 50, marginBlock: 8 }} />
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
