import React from "react";
import { CiSearch } from "react-icons/ci";
import { MdCancel } from "react-icons/md";

export default function Search({ style, placeholder }) {
    return (
        <div
            className="search-container"
            style={{
                background: "#3c3c3cb0",
                borderRadius: 30,
                padding: 12,
                display: "flex",
                alignItems: "center",
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
    );
}
