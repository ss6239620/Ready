import React, { useEffect, useRef, useState } from 'react'
import IconButton from '../buttons/IconButton';

export default function IconDropDown({ Icon, children, style, childStyle,className,childClassName }) {
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
        <div ref={dropDownRef} className='relative' >
            <div className={`${className}`} onClick={() => clicked ? setClicked(false) : setClicked(true)}  style={{  ...style }}>
                <IconButton className={'ml-1'} size={25}  Icon={Icon} />
            </div>
            {clicked &&
                <div className={`card absolute z-[100] top-[60px] rounded-xl ${childClassName}`} style={{ ...childStyle }}>
                    {children}
                </div>
            }
        </div>
    )
}
