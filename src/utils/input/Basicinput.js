import React from 'react'
import '../../asset/css/util.css'

export default function Basicinput({ placeHolder, style, value, setFormValues, name,isRequired }) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        // background: "#3c3c3cb0",
        borderRadius: 30,
        padding: 20,
        display: "flex",
        alignItems: "center",
        ...style,
      }}
      className='basicInput-external-div'
    >
      <input
        style={{
          width: "100%",
          border: "none",
          background: "transparent",
          outline: "none",
          color: "white",
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
