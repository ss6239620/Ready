import React from 'react'
import '../../asset/css/util.css'

export default function BrightBorderButtonOnHover({ style, title, onClick, bottomLine,className }) {
    function handleClick(params) {
        onClick && onClick()
    }
    return (
        <>
            <div className={`${className} bright-border-button-hover div-center flex-col rounded-[30px] p-3 `} onClick={handleClick} style={{ ...style }}>
                <h5 className='primary-text large-text-normal-weight' >{title ? title : ''}</h5>
                {bottomLine && <div className='accent-bg h-[5px] mx-[0.1px] rounded-xl ' />}
            </div>
        </>
    )
}
