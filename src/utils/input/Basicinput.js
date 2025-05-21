import React, { useState, useEffect } from 'react';
import '../../asset/css/util.css';
import IconButton from '../buttons/IconButton'
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

// Debounce function to delay validation
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

export default function Basicinput({
  placeHolder,
  style,
  value,
  setFormValues,
  name,
  isRequired,
  onChangeFunc,
  className,
  validationFunc,
  type
}) {
  const [error, setError] = useState('');
  const [typingStarted, setTypingStarted] = useState(false); // Track if user is typing
  const [passwordReveal, setPasswordReveal] = useState(type || 'text')

  useEffect(() => {
    // Run validation once the user stops typing (debounced)
    if (typingStarted && validationFunc) {
      debouncedValidation(value);
    }
  }, [typingStarted, value]); // Trigger validation after typing has started and value changed

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // Mark that the user has started typing
    setTypingStarted(true);

    if (onChangeFunc) {
      onChangeFunc();
    }
  };

  function passReveal(value) {
    setPasswordReveal(value)
  }

  const handleBlur = (e) => {
    const { value } = e.target;
    // Run validation when the input field loses focus
    if (validationFunc) {
      const validationError = validationFunc(value);
      setError(validationError || ''); // Set error if validation fails
    }
    setTypingStarted(false); // Reset typing status when focus is lost
  };

  // Debounced validation function
  const debouncedValidation = debounce((value) => {
    const validationError = validationFunc(value);
    setError(validationError || ''); // Set error if validation fails
  }, 3000); // 1-second delay after typing stops

  return (
    <div className={``}>
      <div
        className={`basicInput-external-div p-[20px] div-center rounded-[30px] ${error !== '' ? 'border-[var(--teritory)!important]' : ''} ${className}`}
        style={{
          ...style,
        }}
      >
        <input
          className={`primary-text ${error ? 'border-red-500' : ''}`}
          autoComplete="off"
          style={{
            width: '100%',
            border: 'none',
            background: 'transparent',
            outline: 'none',
          }}
          type={type ? passwordReveal : "text"}
          placeholder={`${placeHolder}*`}
          value={value}
          onChange={handleChange} // Handle changes in input
          onBlur={handleBlur} // Handle blur event to trigger validation
          name={name}
        />
        {type === 'password' && (
          passwordReveal ==='text' ?
            <IconButton onClick={()=>{passReveal('password')}} Icon={IoIosEyeOff} size={20} />
            :
            <IconButton onClick={()=>{passReveal('text')}} Icon={IoIosEye} size={20} />
        )}
      </div>
      {error && <p className="text-[var(--teritory)] text-sm small-text-normal-weight mx-[15px!important] my-[0px!important]">* {error}</p>} {/* Error message */}
    </div>
  );
}
