import React from 'react'
import '../../asset/css/util.css'

export default function IconButton({ Icon, size, style, onClick,className }) {
    return (
        <div  onClick={onClick} className={`icon-button-hover cursor-pointer p-2 flex justify-center rounded-[30px] ${className}`} style={{  ...style }}>
            <Icon size={size ? size : 25} />
        </div>
    )
}
