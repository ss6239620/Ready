import React from 'react';
import '../../asset/css/util.css';

export default function Biginput({ placeHolder, style, value, setFormValues, name, minHeight,className }) {

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  

  return (
    <div
      className={`basicInput-external-div secondary-bg ${className} div-center`}
      style={{
        borderRadius: 30,
        padding: 20,
        ...style,
      }}
    >
      <textarea
      className='primary-text'
        style={{
          width: "100%",
          minHeight: minHeight ? minHeight : "30px", // Adjust as desired
          border: "none",
          background: "transparent",
          outline: "none",
          paddingBlock: "10px",
          resize: "vertical", // Controls resizing (or use "none" to disable)
          //   fontSize: "1rem",
          fontFamily: "inherit",
          overflowY: "auto",
        }}
        placeholder={placeHolder}
        value={value}
        onChange={handleChange}
        name={name}
      />
    </div>
  );
}
