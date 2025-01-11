import React from 'react'
import '../../asset/css/util.css'

export default function BrightBorderButtonOnHover({ style, title, onClick, bottomLine }) {
    function handleClick(params) {
        onClick && onClick()
    }
    return (
        <>
            <div onClick={handleClick} style={{ padding: 13, borderRadius: 30, display: 'flex', flexDirection: 'column', justifyContent: 'center', ...style }} className='bright-border-button-hover'>
                <h5 className='primary-text' style={{ padding: 0, margin: 0, marginBottom:8 }}>{title ? title : ''}</h5>
                {bottomLine && <div className='accent-bg' style={{  height: 5, marginInline: 0.1, borderRadius: 10 }} />}
            </div>
        </>
    )
}
