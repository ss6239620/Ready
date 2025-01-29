import React, { useEffect, useRef, useState } from 'react'
import { darkColorTheme } from '../../constant'
import { IoChevronDown } from "react-icons/io5";

export default function ImageDropDown({ source, children, style, childStyle,className,childClassName }) {
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
        <div ref={dropDownRef} className='relative'>
            <div  className={`simple-drop-down ${className} p-2 `} onClick={() => clicked ? setClicked(false) : setClicked(true)} style={{ ...style }}>
                <div className='div-center gap-2'>
                    <img
                        src={source}
                        alt=""
                        className='img-small-style'
                    />
                    <IoChevronDown size={20} />
                </div>
            </div>
            {clicked &&
                <div className={`card absolute z-[100] top-[55px] rounded-xl ${childClassName}`} style={{ ...childStyle }}>
                    {children}
                </div>
            }
        </div>
    )
}
