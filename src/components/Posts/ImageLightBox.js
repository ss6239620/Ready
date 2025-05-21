import React, { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import IconButton from "../../utils/buttons/IconButton";
import { darkColorTheme } from "../../constant";

export default function ImageLightBox({ isOpen, setModal, source }) {
    const imageRef = useRef(null)
    const [clicked, setClicked] = useState(false)

    const handleClickedOutside = (event) => {
        if (imageRef.current && !imageRef.current.contains(event.target) && !event.target.closest('.modal-close-button')) {
            setClicked(prev => !prev)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickedOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickedOutside);
        }
    }, [])
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

    return (
        <div
            className={`modal-overlay ${clicked ? 'cursor-zoom-out' : 'cursor-zoom-in'} `}
        >
            <div
                className="modal-content div-center-justify-center w-[100%!important] h-[100%!important] relative overflow-y-auto p-[0px!important] "
            >
                <img
                    ref={imageRef}
                    src={source}
                    className="w-[100%] max-h-[100vh] object-cover block absolute blur-[100px] z-[1] "
                />
                <img
                    src={source}
                    style={{
                        width: clicked ? '90%' : "100%",
                        maxHeight: clicked ? null : "100%",
                        objectFit: "contain",
                        display: "block", // Removes extra space under image
                        position: 'relative',
                        zIndex: 2,
                    }}
                />
                <div className="modal-close-button primary-bg absolute top-5 z-[2] right-5 rounded-[50%] border cursor-pointer " onClick={() => setModal(false)}>
                    <IconButton Icon={RxCross1} size={30} />
                </div>
            </div>
        </div>

    );
}
