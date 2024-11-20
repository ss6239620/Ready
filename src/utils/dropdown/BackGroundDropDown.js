import React, { useEffect, useRef, useState } from 'react'
import { darkColorTheme, FILE_URL } from '../../constant'
import { IoChevronDown } from "react-icons/io5";
import Search from '../Search';

export default function BackGroundDropDown({ title, children, style, selectedTribe }) {
    const [clicked, setClicked] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setClicked(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function closeDropDown() {
        setClicked(false);
    }

    return (
        <div ref={dropdownRef} style={{}}>
            {!clicked &&
                <div onClick={() => clicked ? setClicked(false) : setClicked(true)} style={{ cursor: "pointer", display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, background: darkColorTheme.secondaryColor, borderRadius: 30, ...style }}>
                    <div
                        style={{
                            width: "35px",
                            height: "35px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={selectedTribe ? `${FILE_URL}/${selectedTribe.tribeProfileImage}` : require('../../asset/img/logo.png')}
                            alt=""
                            style={{
                                width: "90%",
                                height: "90%",
                                objectFit: "cover",
                                borderRadius: "50%", // Optional: makes the image circular
                                display: "block", // Removes extra space under image
                            }}
                        />
                    </div>
                    <h5 style={{ marginBlock: 0, color: darkColorTheme.secondaryTextColor, marginLeft: 5 }}>{selectedTribe ? selectedTribe.tribeName : title}</h5>
                    <IoChevronDown size={15} style={{ marginLeft: 5 }} />
                </div>
            }
            {clicked &&
                <div >
                    <Search style={{ width: '40%' }} />
                </div>
            }
            <div style={{ position: 'absolute', zIndex: 999, marginTop: 10, width: '21%' }}>
                {clicked && React.cloneElement(children, { closeDropDown })}
            </div>
        </div>
    )
}
