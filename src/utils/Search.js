import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdCancel } from "react-icons/md";

export default function Search({ style, placeholder, children,setclicked,clicked }) {
    const searchRef = useRef(null);

    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setclicked(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])


    return (
        <div ref={searchRef}>
            <div
                onClick={() => setclicked((prev) => !prev)}
                className="search-container"
                style={{
                    background: "#3c3c3cb0",
                    borderRadius: 30,
                    padding: 12,
                    display: "flex",
                    alignItems: "center",
                    border: clicked ? '2px solid #fff' : 'none',
                    ...style
                }}
            >
                <CiSearch />
                <input
                    style={{
                        border: "none",
                        background: "transparent",
                        outline: "none",
                        color: "white", // Change to your text color
                        marginLeft: 8,
                        flex: 1, // Makes the input expand to fill available space
                    }}
                    placeholder={placeholder ? placeholder : 'Search...'}
                />
                <MdCancel />
            </div>
            {clicked && children}
        </div>
    );
}
