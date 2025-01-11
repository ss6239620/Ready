import React, { useEffect, useRef, useState } from 'react'
import { darkColorTheme } from '../../constant'
import { IoChevronDown } from "react-icons/io5";

export default function ImageDropDown({ source, children, style, childStyle }) {
    const [clicked, setClicked] = useState(false);
    const dropDownRef = useRef(null);

    function handleClickOutside(event) {
        if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
            setClicked(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    return (
        <div ref={dropDownRef} style={{ position: 'relative' }}>
            <div  className='simple-drop-down' onClick={() => clicked ? setClicked(false) : setClicked(true)} style={{padding:10, ...style }}>
                <div className='div-center' style={{gap:10}}>
                    <img
                        src={source}
                        alt=""
                        style={{
                            width: "30px",
                            height: "30px",
                            objectFit: "cover",
                            borderRadius: "50%", // Optional: makes the image circular
                            display: "block", // Removes extra space under image
                        }}
                    />
                    <IoChevronDown size={20} />
                </div>
            </div>
            {clicked &&
                <div className='card' style={{ position: 'absolute', zIndex: 100, top: 40, borderRadius: 10, ...childStyle }}>
                    {children}
                </div>
            }
        </div>
    )
}
