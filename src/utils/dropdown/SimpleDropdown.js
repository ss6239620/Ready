import React, { useEffect, useRef, useState } from 'react'
import { darkColorTheme } from '../../constant'
import { IoChevronDown } from "react-icons/io5";

export default function SimpleDropdown({ title, children, style, childStyle }) {
    const [clicked, setClicked] = useState(false);
    const dropDownRef = useRef(null);

    function handleClickOutside(event) {
        if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
            setClicked(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown',handleClickOutside);
        return()=>{
            document.removeEventListener('mousedown',handleClickOutside);
        }
    }, [])

    return (
        <div ref={dropDownRef} style={{ position: 'relative' }}>
            <div onClick={() => clicked ? setClicked(false) : setClicked(true)} className='simple-drop-down' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10, cursor: 'pointer', ...style }}>
                <h5 style={{ marginBlock: 0, color: darkColorTheme.secondaryTextColor }}>{title}</h5>
                <IoChevronDown size={15} style={{ marginLeft: 5 }} />
            </div>
            {clicked &&
                <div className='card' style={{ position: 'absolute', zIndex: 100, top: 40, borderRadius: 10, ...childStyle }}>
                    {children}
                </div>
            }
        </div>
    )
}
