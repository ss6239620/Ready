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
            className="modal-overlay div-center-justify-center"
            onClick={handleOverlayClick}
        >
            <div
                className="modal-content rounded-[2%] w-[50%!important] h-[80%!important] flex flex-col justify-between relative "
            >
                <div className="flex justify-between">
                    <div>
                        <h2 className="large-text-normal-weight">Tell us about your Tribe</h2>
                        <a className="large-text-small-weight secondary-text">
                            Fillout the information to let other people know about your tribe.
                        </a>
                    </div>
                    <div onClick={() => setModal(false)}>
                        <RxCross1 className="back-button p-1" size={25} />
                    </div>
                </div>

                <div className="flex justify-between h-[85%]">
                    <div className="slectDivContainer flex-[1_0_10%] overflow-y-auto px-2 py-[5px]" >
                        <Basicinput setFormValues={setformValues} name={'tribeName'} value={formValues.tribeName} placeHolder={'Tribe name'} />
                        <Biginput setFormValues={setformValues} name={'tribeDescription'} value={formValues.tribeDescription} placeHolder={'Tribe description'} className={'my-7 h-[40%]'} />

                        <div><Search placeholder={"Filter Topic"} className={'w-[100%!important] mb-7 '} /></div>

                        <div  className="div-center-justify mb-5" >
                            <a>Tribe Banner</a>
                            <div className="flex">
                                {tribeBannerImage && <a>{tribeBannerImage?.name}</a>}
                                <BigButton className={'secondary-bg p-[5px!important]'} setFile={setTribeBanner} title={'Add'} Icon={LuImage}  />
                            </div>
                        </div>
                        <div className="div-center-justify" >
                            <a>Tribe Icon</a>
                            <div className="flex" >
                                {tribeProfileImage && <a>{tribeProfileImage?.name}</a>}
                                <BigButton className={'secondary-bg p-[5px!important] '} setFile={setTribeProfileImage} title={'Add'} Icon={LuImage}   />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1" >
                        <div
                            className="card m-5 rounded-2xl shadow-[0px_4px_10px_rgba(0,0,0,0.2)] overflow-hidden "
                        >
                            {tribeBannerImage &&
                                <img
                                    src={URL.createObjectURL(tribeBannerImage)}
                                    alt="Logo"
                                    className="img-small-style w-[100%!important] rounded-[0px!important] "
                                />
                            }
                            <div className="div-center-justify p-5">
                                {tribeProfileImage &&
                                    <img
                                        src={URL.createObjectURL(tribeProfileImage)}
                                        alt="Logo"
                                        className="img-small-style w-[40px!important] h-[40px!important] "
                                    />
                                }
                                <div className="px-1">
                                    <h3 className="large-text-large-weight mx-[0px!important] my-[0px!important]">t/{formValues.tribeName}</h3>
                                    <div>
                                        <p className="medium-text-normal-weight secondary-text">
                                            1 member <span> . </span> <span>1 online</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-5">
                                {formValues.tribeDescription}
                            </div>
                        </div>
                    </div>

                </div>
                <BigButton className={'accent-bg text-[#fff] w-[15%] absolute bottom-5 right-5 rounded-[30px!important]'} onClick={handleClick} title={'Create Tribe'}  />
            </div>
        </div>

    );
}
