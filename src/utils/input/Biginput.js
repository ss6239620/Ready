import React from 'react';
import '../../asset/css/util.css';

export default function Biginput({ placeHolder, style, value, setFormValues, name, minHeight }) {

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
      className="basicInput-external-div"
      style={{
        background: "#3c3c3cb0",
        borderRadius: 30,
        padding: 20,
        display: "flex",
        alignItems: "center",
        ...style,
      }}
    >
      <textarea
        style={{
          width: "100%",
          minHeight: minHeight ? minHeight : "150px", // Adjust as desired
          border: "none",
          background: "transparent",
          outline: "none",
          color: "white",
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
