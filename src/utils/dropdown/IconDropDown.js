import React, { useEffect, useRef, useState } from 'react'
import IconButton from '../buttons/IconButton';

export default function IconDropDown({ Icon, iconSize, children, style, childStyle, className, childClassName, onClose }) {
    const [clicked, setClicked] = useState(false);
    const [visible, setvisible] = useState(false);
    const dropDownRef = useRef(null);

    function handleClickOutside(event) {
        if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
            setClicked(false);
        }
    }
    function closeDropDown(params) {
        setClicked(false);
        onClose?.();
        setTimeout(() => {
            setvisible(false);
        }, 200);
    }

    function handleToggle() {
        if (clicked)
            closeDropDown();
        else {
            setvisible(true)
            setTimeout(() => {
                setClicked(true);
            }, 10);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    return (
        <div ref={dropDownRef} className='relative' >
            <div className={`${className}`} onClick={handleToggle} style={{ ...style }}>
                <IconButton className={'ml-1'} size={iconSize || 25} Icon={Icon} />
            </div>
            {visible &&
                <div className={`card absolute z-[100]  rounded-xl transition-all duration-200 ease-in-out ${clicked?"opacity-100 translate-y-0":"opacity-0 translate-y-2"} ${childClassName}`} style={{ ...childStyle }}>
                    {typeof children === 'function' ? children(closeDropDown) : children}
                </div>
            }
        </div>
    )
}
