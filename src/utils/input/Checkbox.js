import React from 'react';
import '../../asset/css/util.css';

export default function Checkbox({ checked = false, onChange }) {
  const toggleCheckbox = () => {
    if (onChange) {
      onChange(!checked); // Call the parent’s `onChange` handler with the new state
    }
  };

  return (
    <div className="custom-checkbox" onClick={toggleCheckbox}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {}} // Prevent default behavior; rely on `onClick` for toggling
        className="hidden-checkbox"
      />
      <div className={`custom-checkbox-box ${checked ? 'checked' : ''}`} />
    </div>
  );
}
