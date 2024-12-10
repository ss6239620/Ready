import React, { useEffect, useState } from "react";
import { darkColorTheme } from "../../constant";
import { RxCross1 } from "react-icons/rx";
import Basicinput from "../../utils/input/Basicinput";
import Biginput from "../../utils/input/Biginput";
import BigButton from "../../utils/buttons/BigButton";
import { LuImage } from "react-icons/lu";
import Search from "../../utils/Search";
import { createTribe } from "../../services/tribe";

export default function Tribe({ isOpen, setModal }) {
    const [tribeBannerImage, setTribeBanner] = useState(null);
    const [error, setError] = useState('')
    const [tribeProfileImage, setTribeProfileImage] = useState(null)
    const [formValues, setformValues] = useState({
        tribeName: '',
        tribeDescription: '',
        topics: []
    })

      // Add/remove `modal-open` class when `isOpen` changes
      useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        // Cleanup on unmount
        return () => document.body.classList.remove('modal-open');
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (event) => {
        // Close modal only if clicking on the overlay, not the modal content
        if (event.target === event.currentTarget) {
            setModal(false);
        }
    };

    async function handleClick(e) {
        // e.preventDefault();
        const form = new FormData();
        form.append('tribename', formValues.tribeName);
        form.append('tribedescription', formValues.tribeDescription);
        form.append('topics', formValues.topics);
        form.append('tribebannerimage', tribeBannerImage);
        form.append('tribeprofileimage', tribeProfileImage);

        createTribe(form).then((res) => {
            setModal(false)
        }).catch((err) => {
            console.log(err.response.data);
            setError(err.response.data.error)
        })
    }

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
                    borderRadius: '2%', width: '50%', height: '75%', display: 'flex',  // Use flexbox for layout
                    flexDirection: 'column',  // Stack elements vertically
                    justifyContent: 'space-between',  // Distribute space between items, pushing the button to the bottom
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <h2 style={{ marginBlock: 5 }}>Tell us about your Tribe</h2>
                        <a style={{ fontSize: 15, color: darkColorTheme.secondaryTextColor }}>
                            Fillout the information to let other people know about your tribe.
                        </a>
                    </div>
                    <div onClick={() => setModal(false)}>
                        <RxCross1 className="back-button" size={25} style={{ padding: 5 }} />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', height: '75%', }}>
                    <div className="slectDivContainer" style={{ flex: '1 0 10%', overflowY: "auto", paddingInline: 10, paddingBlock: 5 }}>
                        <Basicinput setFormValues={setformValues} name={'tribeName'} value={formValues.tribeName} placeHolder={'Tribe name'} />
                        <Biginput setFormValues={setformValues} name={'tribeDescription'} value={formValues.tribeDescription} placeHolder={'Tribe description'} style={{ marginBlock: 30, height: '40%' }} />

                        <div><Search placeholder={"Filter Topic"} style={{ marginBottom: 30, width: '90%' }} /></div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <a>Tribe Banner</a>
                            <div style={{display:'flex'}}>
                                {tribeBannerImage && <a>{tribeBannerImage?.name}</a>}
                                <BigButton setFile={setTribeBanner} title={'Add'} Icon={LuImage} style={{ background: darkColorTheme.divider, padding: 5 }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <a>Tribe Icon</a>
                            <div style={{display:'flex'}}>
                                {tribeProfileImage && <a>{tribeProfileImage?.name}</a>}
                                <BigButton setFile={setTribeProfileImage} title={'Add'} Icon={LuImage} style={{ background: darkColorTheme.divider, padding: 5 }} />
                            </div>
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div
                            style={{
                                margin: 20,
                                borderRadius: 20,
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                background: 'black',
                                overflow: 'hidden', // Ensures border radius applies to inner content
                            }}
                        >
                            <div style={{ width: '100%', height: 35 }}>
                                {tribeBannerImage &&
                                    <img
                                        src={URL.createObjectURL(tribeBannerImage)}
                                        alt="Logo"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            display: 'block', // Removes extra space under image
                                        }}
                                    />
                                }
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
                                <div style={{ width: 40, height: 40 }}>
                                    {tribeProfileImage &&
                                        <img
                                            src={URL.createObjectURL(tribeProfileImage)}
                                            alt="Logo"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                display: 'block', // Removes extra space under image
                                                borderRadius: '50%'
                                            }}
                                        />
                                    }
                                </div>
                                <div style={{ paddingInline: 5 }}>
                                    <h3 style={{ margin: 0 }}>t/{formValues.tribeName}</h3>
                                    <div>
                                        <p style={{ fontSize: 15, color: darkColorTheme.secondaryTextColor, margin: 0, padding: 0 }}>
                                            1 member <span> . </span> <span>1 online</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div style={{ paddingInline: 20, paddingBottom: 20 }}>
                                {formValues.tribeDescription}
                            </div>
                        </div>
                    </div>

                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div></div>
                    <BigButton onClick={handleClick} title={'Create Tribe'} style={{ background: darkColorTheme.accentColor, borderRadius: 30, width: '15%' }} />
                </div>

            </div>
        </div>

    );
}
