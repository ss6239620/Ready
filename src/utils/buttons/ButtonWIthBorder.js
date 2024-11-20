import React, { useRef, useState } from 'react';
import { darkColorTheme } from '../../constant'
import '../../asset/css/util.css'

export default function BigButton({ title, style, Icon, onClick, className, disabled, setFile, iconSize }) {
    const [isHovered, setIsHovered] = useState(false);
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
            className={`button-with-border `}
            style={{
                paddingInline:10,paddingBlock:8,
                borderRadius: 30,
                cursor: 'pointer',
                transition: 'opacity 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: "red",
                border: isHovered ? '1px solid #fff' : `1px solid gray `,
                ...style,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleButtonClick} // Prevent onClick if disabled
        >
            {Icon && (
                <div style={{ marginRight: title ? 10 : 0 }}>
                    <Icon size={iconSize ? iconSize : 25} />
                </div>
            )}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <a>{title}</a>
            </div>

            {setFile && <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }} // Hide the file input
                onChange={handleFileChange}
            />}
        </div>
    );
}
