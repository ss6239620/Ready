// components/CircularLoader.jsx
import React from 'react'

const CircularLoader = ({ className }) => {
    return (
        <div className={`py-10 flex items-center justify-center ${className}`}>
            <div className="w-16 h-16 border-4 border-[var(--accent)] border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
    );
};


export default CircularLoader;
