import React, { useEffect, useRef, useState } from 'react'
import { darkColorTheme } from '../../constant'
import { IoChevronDown } from "react-icons/io5";

export default function SimpleDropdown({ title, children, style, childStyle, className, childClassName }) {
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
            <div onClick={() => clicked ? setClicked(false) : setClicked(true)} className={`simple-drop-down div-center-justify-center p-3 cursor-pointer ${className}`} style={{ ...style }}>
                <h5 className="small-text-normal-weight"  >{title}</h5>
                <IoChevronDown size={15} className='ml-1' />
            </div>
            {clicked &&
                <div className={`card absolute z-[100] top-[65px] rounded-xl ${childClassName} `} style={{ ...childStyle }}>
                    {typeof children === 'function' ? children(() => setClicked(false)) : children}
                </div>
            }
        </div>
    )
}
