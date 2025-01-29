import React, { useEffect, useRef, useState } from 'react'
import { darkColorTheme, FILE_URL } from '../../constant'
import { IoChevronDown } from "react-icons/io5";
import Search from '../Search';

export default function BackGroundDropDown({ title, children, style, selectedTribe,className }) {
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
        <div ref={dropdownRef} >
            {!clicked &&
                <div className={`secondary-bg ${className} cursor-pointer div-center-justify p-2 border-radius-large `} onClick={() => clicked ? setClicked(false) : setClicked(true)} style={{ ...style }}>
                        <img
                            src={selectedTribe ? `${FILE_URL}/${selectedTribe.tribeProfileImage}` : require('../../asset/img/logo.png')}
                            alt=""
                            className='img-small-style'
                        />
                    <h5 className="small-text-normal-weight secondary-text" >{selectedTribe ? selectedTribe.tribeName : title}</h5>
                    <IoChevronDown size={15} className='ml-1'  />
                </div>
            }
            {clicked &&
                <div >
                    <Search className={'w-[40%!important]'}  />
                </div>
            }
            <div className='absolute z-10 mt-3 w-[21%]'>
                {clicked && React.cloneElement(children, { closeDropDown })}
            </div>
        </div>
    )
}
