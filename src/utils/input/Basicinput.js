import React from 'react'
import '../../asset/css/util.css'

export default function Basicinput({ placeHolder, style, value, setFormValues, name, isRequired, onChangeFunc }) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    if (onChangeFunc) {
      onChangeFunc()
    }
  };

  return (
    <div
      style={{
        borderRadius: 30,
        padding: 20,
        display: "flex",
        alignItems: "center",
        ...style,
      }}
      className='basicInput-external-div'
    >
      <input
        className='primary-text'
        autoComplete='off'
        style={{
          width: "100%",
          border: "none",
          background: "transparent",
          outline: "none",
        }}
        type="text"
        placeholder={`${placeHolder}*`}
        value={value}
        onChange={handleChange}
        name={name}
      />
    </div>
  )
}
