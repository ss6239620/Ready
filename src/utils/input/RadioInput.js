import React, { useState } from 'react';
import '../../asset/css/util.css';
import { darkColorTheme } from '../../constant';


function RadioInput({ style, title, selected, setSelected, onCLose }) {

    const handleChange = (value) => {
        setSelected(value);
        onCLose?.();
    };

    const selected_radio = selected === title

    return (
        <div className={`${selected_radio ? 'secondary-bg' : ''} px-4 py-1 `} style={{ ...style, }}>
            <label className="radio-container">
                <input
                    type="radio"
                    name="custom-radio"
                    value={title}
                    checked={selected_radio}
                    onChange={() => handleChange(title)}
                />
                <span className="custom-radio"></span>
                <p className="medium-text-normal-weight ">{title}</p>
            </label>
        </div>
    );
}

export default RadioInput;
