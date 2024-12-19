import React, { useState } from 'react';
import '../../asset/css/util.css';
import { darkColorTheme } from '../../constant';


function RadioInput({ style, title, selected, setSelected }) {

    const handleChange = (value) => {
        setSelected(value);
    };

    const selected_radio = selected === title

    return (
        <div style={{ ...style, background: selected_radio ? darkColorTheme.divider : '', paddingInline: 15, paddingBlock: 8, }}>
            <label className="radio-container">
                <input
                    type="radio"
                    name="custom-radio"
                    value={title}
                    checked={selected_radio}
                    onChange={() => handleChange(title)}
                />
                <span className="custom-radio"></span>
                <p style={{ marginBlock: 0 }}>{title}</p>
            </label>
        </div>
    );
}

export default RadioInput;
