import React, { useRef, useState } from 'react';
import '../../asset/css/util.css'

export default function BigButton({ title, style, Icon, onClick, className, disabled, setFile, iconSize, labelStyle, loading, type = "button", }) {
    const [isHovered, setIsHovered] = useState(false);
    const fileInputRef = useRef(null); // Reference for the file input


    const handleFileChange = (e) => {
        if (setFile) {
            setFile(e.target.files[0]); // Pass the selected file to the parent component
        }
    };

    // Handle button click, and trigger file input click if file upload button is set
    const handleButtonClick = (e) => {
        if (!disabled) {
            if (fileInputRef.current) {
                fileInputRef.current.click(); // Trigger file input click
            }
            onClick && onClick(e); // Call onClick if provided
        }
    };

    return (
        <button
            className={`${className} rounded-lg cursor-pointer p-[10px] ${isHovered ? 'opacity-70' : 'opacity-100'} transition-[opacity_0.3s] div-center`}
            style={{
                ...style,
            }}
            disabled={disabled}
            type={type}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleButtonClick} // Prevent onClick if disabled
        >
            {Icon && (
                <div className='div-center-justify-center mr-1' >
                    <Icon size={iconSize ? iconSize : 25} />
                </div>
            )}
            <div className='div-justify-center flex-1' style={{ ...labelStyle }}>
                {loading ? <div className="spinner"></div> :
                    <a>{title}</a>
                }
            </div>

            {setFile && <input
                ref={fileInputRef}
                type="file"
                className='hidden'
                onChange={handleFileChange}
            />}
        </button>
    );
}
