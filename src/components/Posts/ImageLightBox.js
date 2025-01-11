import React, { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import IconButton from "../../utils/buttons/IconButton";
import { darkColorTheme } from "../../constant";

export default function ImageLightBox({ isOpen, setModal, source }) {
    const imageRef = useRef(null)
    const [clicked, setClicked] = useState(false)

    const handleClickedOutside = (event) => {
        if (imageRef.current && !imageRef.current.contains(event.target)) {
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
            className="modal-overlay"
            style={{
                cursor: clicked ? 'zoom-out' : 'zoom-in'
            }}
        >
            <div

                className="modal-content div-center"
                style={{
                    width: '100%',
                    height: '100%',
                    padding: 0,
                    borderRadius: 0,
                    justifyContent: 'center',  // Distribute space between items, pushing the button to the bottom
                    position: 'relative',
                    overflowY:'auto',
                }}
            >
                <img
                    ref={imageRef}
                    src={source}
                    style={{
                        width: "100%",
                        maxHeight:'100vh',
                        objectFit: "cover",
                        display: "block", // Removes extra space under image
                        position: 'absolute',
                        filter: 'blur(100px)',
                        zIndex: 1,
                        backgroundColor: 'red'
                    }}
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
                <div className="primary-bg" onClick={() => setModal(false)} style={{
                    position: 'absolute',
                    top: 20, right: 20,
                    zIndex: 2, padding: 5, borderRadius: '50%', border: '2px solid #fff', cursor: 'pointer'
                }}>
                    <IconButton Icon={RxCross1} size={30} />
                </div>
            </div>
        </div>

    );
}
