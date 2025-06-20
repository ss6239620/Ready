import React from 'react';

export default function ToggleInput({ selected, setSelected, onChange, disabled = false }) {
    function handleSelect(e) {
        if (onChange) return onChange();
        e.stopPropagation();
        if (disabled) return;
        setSelected?.(!selected);
    }

    return (
        <label className={`inline-flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <input
                type="checkbox"
                className="sr-only peer"
                checked={selected}
                onChange={handleSelect}
                disabled={disabled}
            />
            <div className={`relative w-11 h-6 rounded-full
                after:content-[''] after:absolute after:top-0.5 after:start-[2px]
                after:rounded-full after:h-5 after:w-5 after:transition-all
                peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                peer-checked:after:border-white after:border after:border-gray-300 after:bg-white
                ${disabled ? 'bg-gray-300 dark:bg-[var(--divider)]' : 'bg-gray-200 dark:bg-[var(--divider)] peer-checked:bg-blue-600'}
            `}></div>
        </label>
    );
}
