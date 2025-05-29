import React, { useEffect, useRef, useState } from 'react'
import IconButton from '../buttons/IconButton';
import { TbArrowDownRhombus } from "react-icons/tb";
import { truncateText } from '../CommonFunction';

export default function BasicInputDropDown({ title, choosenData, children, style, childStyle, className, childClassName }) {
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
        <div ref={dropDownRef} className='relative w-[100%] secondary-bg rounded-[45px!important]'>
            <div onClick={() => clicked ? setClicked(false) : setClicked(true)} className={`cursor-pointer ${className}`} style={{ ...style }}>
                <div className='div-center-justify '>
                    <div className='px-4 py-2'>
                        <h5 className="small-text-small-weight !mb-0 text-[var(--text-secondary)]">{title}</h5>
                        <h5 className="medium-text-normal-weight !mt-0 ">{truncateText(choosenData,35) || "Select Option"}</h5>
                    </div>
                    <IconButton size={20} Icon={TbArrowDownRhombus} />
                </div>
            </div>
            {clicked &&
                <div className={`card w-full absolute z-[100] top-[65px] rounded-xl ${childClassName} `} style={{ ...childStyle }}>
                    {typeof children === 'function' ? children(() => setClicked(false)) : children}
                </div>
            }
        </div>
    )
}
