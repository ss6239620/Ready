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

            </div>
        </div>

    );
}
