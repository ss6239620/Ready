import React from 'react'
import '../../asset/css/util.css'

export default function IconButton({ Icon, size, style, onClick, className, disabled }) {
    function handleClick() {
        if (!disabled) {
            onClick?.()
        }
    }
    return (
        <div onClick={handleClick} className={`${!disabled && "icon-button-hover cursor-pointer"}  p-2 flex justify-center rounded-[30px] ${className}`} style={{ ...style }}>
            <Icon color={disabled && "gray"} size={size ? size : 25} />
        </div>
    )
}
