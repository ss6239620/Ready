import React, { useState, useEffect, useMemo, useCallback } from 'react';
import '../../asset/css/util.css';
import IconButton from '../buttons/IconButton'
import { IoIosEye, IoIosEyeOff, IoMdClose } from "react-icons/io";
import { debounce } from '../CommonFunction';

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
  type,
  isSingleValueSetter,
  disabled,
  disableRemoveFunc,
  errorText,
  errorTextClass
}) {
  const [error, setError] = useState('');
  const [typingStarted, setTypingStarted] = useState(false); // Track if user is typing
  const [passwordReveal, setPasswordReveal] = useState(type || 'text')

  // Debounced validation using `useCallback` + `setTimeout` cleanup
  const debouncedValidation = useCallback(
    debounce((value) => {
      if (validationFunc) {
        const validationError = validationFunc(value);
        setError(validationError || '');
      }
    }, 500), // 500ms debounce delay (adjust as needed)
    [validationFunc]
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedValidation.cancel?.(); // Cancel pending debounce
    };
  }, [debouncedValidation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isSingleValueSetter) {
      setFormValues(value)
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
    setTypingStarted(true);
    onChangeFunc?.();
  };

  function passReveal(value) {
    setPasswordReveal(value)
  }

  // Trigger debounced validation when typing starts & value changes
  useEffect(() => {
    if (typingStarted && validationFunc) {
      debouncedValidation(value);
    }
  }, [typingStarted, value, debouncedValidation, validationFunc]);

  const handleBlur = (e) => {
    const { value } = e.target;
    if (validationFunc) {
      const validationError = validationFunc(value);
      setError(validationError || '');
    }
    setTypingStarted(false);
  };

  return (
    <div className={``}>
      <div
        className={`basicInput-external-div p-[20px] div-center rounded-[30px]  ${error !== '' ? 'border-[var(--teritory)!important]' : ''} ${className}`}
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
          value={disabled ? "" : value}
          onChange={handleChange} // Handle changes in input
          onBlur={handleBlur} // Handle blur event to trigger validation
          name={name}
          disabled={disabled}
        />
        {type === 'password' && (
          passwordReveal === 'text' ?
            <IconButton onClick={() => { passReveal('password') }} Icon={IoIosEyeOff} size={20} />
            :
            <IconButton onClick={() => { passReveal('text') }} Icon={IoIosEye} size={20} />
        )}
        {disabled && (
          <IconButton onClick={() => { disableRemoveFunc?.() }} Icon={IoMdClose} size={20} />
        )}
      </div>
      {error && <p className="text-[var(--teritory)] text-sm small-text-normal-weight mx-[15px!important] my-[0px!important]">* {error}</p>}
      {errorText && <p className={`text-[var(--text-error-color)] text-sm small-text-normal-weight mx-[15px!important] my-[3px!important] ${errorTextClass}`}> {errorText}</p>}
    </div>
  );
}
