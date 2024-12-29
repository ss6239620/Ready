import React, { useRef, useState } from 'react';

export default function BigButton({ title, style, Icon, onClick, className, disabled, setFile,iconSize ,labelStyle}) {
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
            className={className}
            style={{
                padding: 10,
                borderRadius: 10,
                cursor: 'pointer',
                opacity: isHovered ? 0.7 : 1,
                transition: 'opacity 0.3s',
                display: 'flex',
                alignItems: 'center',
                background: "red",
                ...style,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleButtonClick} // Prevent onClick if disabled
        >
            {Icon && (
                <div style={{ marginRight: 5,display:'flex',justifyContent:'center',alignItems:'center' }}>
                    <Icon size={iconSize?iconSize:25} />
                </div>
            )}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center',...labelStyle }}>
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
