import React, { useState } from 'react';
import '../../asset/css/util.css';

export default function LimitInput({
    placeHolder,
    style,
    value,
    setFormValues,
    name,
    isRequired,
    onChangeFunc,
    className,
    isSingleValueSetter,
    hideTotalChar,
    disabled,
    maxChars = 100, // Default max characters
    type = 'input', // Default to 'input', can be 'textarea'
}) {
    const [remainingChars, setRemainingChars] = useState(maxChars);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (value.length <= maxChars) {
            if (isSingleValueSetter) {
                setFormValues(value)
            } else {
                setFormValues((prev) => ({ ...prev, [name]: value }));
            }
            setRemainingChars(maxChars - value.length);
        }

        if (onChangeFunc) {
            onChangeFunc();
        }
    };

    return (
        <div>
            <div
                className={`basicInput-external-div p-[20px] div-center rounded-[30px] ${className}`}
                style={{
                    ...style,
                }}
            >
                {type === 'textarea' ? (
                    <textarea
                        disabled={disabled}
                        className="primary-text"
                        autoComplete="off"
                        style={{
                            width: '100%',
                            border: 'none',
                            background: 'transparent',
                            outline: 'none',
                            resize: 'none', // Prevent resizing
                        }}
                        placeholder={`${placeHolder}*`}
                        value={disabled ? "" : value}
                        onChange={handleChange}
                        name={name}
                        maxLength={maxChars}
                        rows={5} // Default rows for textarea
                    />
                ) : (
                    <input
                        disabled={disabled}
                        className="primary-text"
                        autoComplete="off"
                        style={{
                            width: '100%',
                            border: 'none',
                            background: 'transparent',
                            outline: 'none',
                        }}
                        type="text"
                        placeholder={`${placeHolder}*`}
                        value={disabled ? "" : value}
                        onChange={handleChange}
                        name={name}
                        maxLength={maxChars}
                    />
                )}
            </div>
            <div className={`div-center ${!hideTotalChar ? "justify-between" : "justify-end"} secondary-text px-5`}>
                {!hideTotalChar && <a className="small-text-normal-weight my-[0px!important]">Max characters {maxChars}</a>}
                <a className="small-text-normal-weight my-[0px!important]">{remainingChars}</a>
            </div>
        </div>
    );
}
