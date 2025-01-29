import React from "react";

export default function Modal({ isOpen,setModal }) {
    if (!isOpen) return null;

    const handleOverlayClick = (event) => {
        // Close modal only if clicking on the overlay, not the modal content
        if (event.target === event.currentTarget) {
            setModal(false);
        }
    };

    return (
        <div
            className="modal-overlay div-center-justify-center"
            onClick={handleOverlayClick}
        >
            <div
                className="modal-content h-[80%] flex flex-col justify-between "
            >

            </div>
        </div>

    );
}
