import React from "react";
import "../asset/css/util.css";


const RippleEffect = ({ src, alt, size = 200 }) => {
  return (
    <div
      className="ripple-container"
      style={{ width: size, height: size }}
    >
      <img src={src} alt={alt} className="ripple-image" style={{ width: "100%", height: "100%" }} />
      <div className="ripple-ring"></div>
    </div>
  );
};

export default RippleEffect;
