import React from 'react'
import '../../asset/css/util.css'

export default function IconButton({ Icon, size, style }) {
    return (
        <div className='icon-button-hover' style={{ cursor:'pointer',padding: 8,display:'flex',justifyContent:'center', borderRadius: 30, ...style }}>
            <Icon size={size ? size : 25} />
        </div>
    )
}
