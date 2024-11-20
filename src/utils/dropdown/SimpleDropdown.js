import React, { useState } from 'react'
import { darkColorTheme } from '../../constant'
import { IoChevronDown } from "react-icons/io5";

export default function SimpleDropdown({ title, children }) {
    const [clicked, setClicked] = useState(false)
    return (
        <>
            <div onClick={() => clicked ? setClicked(false) : setClicked(true)} className='simple-drop-down' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                <h5 style={{ marginBlock: 0, color: darkColorTheme.secondaryTextColor }}>{title}</h5>
                <IoChevronDown size={15} style={{ marginLeft: 5 }} />
            </div>
            {clicked && children}
        </>
    )
}
