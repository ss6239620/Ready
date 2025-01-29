import React, { useRef, useState } from 'react';
import { darkColorTheme } from '../../constant'
import '../../asset/css/util.css'

export default function ButtonWithBorder({ title, style, Icon, onClick, className, disabled, setFile, iconSize }) {
    const fileInputRef = useRef(null); // Reference for the file input


    const handleFileChange = (e) => {
        if (setFile) {
            setFile(e.target.files[0]); // Pass the selected file to the parent component
        }
    };

    // Handle button click, and trigger file input click if file upload button is set
    const handleButtonClick = () => {
        if (!disabled) {
            if (fileInputRef.current) {
                fileInputRef.current.click(); // Trigger file input click
            }
            onClick && onClick(); // Call onClick if provided
        }
    };

    return (
        <div
            className={`button-with-border px-[10px] py-[8px] rounded-[30px] cursor-pointer transition-[opacity_0.3s] div-center-justify-center `}
            style={{
                ...style,
            }}
            onClick={handleButtonClick} // Prevent onClick if disabled
        >
            {Icon && (
                <div className={`${title?'mr-[10px]':'mr-0'}`}>
                    <Icon size={iconSize ? iconSize : 25} />
                </div>
            )}
            <div className='div-justify-center flex-1' >
                <a>{title}</a>
            </div>

            {setFile && <input
                ref={fileInputRef}
                type="file"
                className='hidden'
                onChange={handleFileChange}
            />}
        </div>
    );
}
