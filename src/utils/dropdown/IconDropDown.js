import React, { useEffect, useRef, useState } from 'react'
import { darkColorTheme } from '../../constant'
import { IoChevronDown } from "react-icons/io5";
import IconButton from '../buttons/IconButton';

export default function IconDropDown({ Icon, children, style, childStyle }) {
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
            <div onClick={() => clicked ? setClicked(false) : setClicked(true)}  style={{  ...style }}>
                <IconButton size={25} style={{ marginLeft: 5 }} Icon={Icon} />
            </div>
            {clicked &&
                <div style={{ position: 'absolute', zIndex: 100, top: 40, background: '#212121', borderRadius: 10, ...childStyle }}>
                    {children}
                </div>
            }
        </div>
    )
}
