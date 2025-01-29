import React, { useState, useEffect } from 'react';
import { BiSolidError } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

export default function FailAlert({ className, title }) {
  const [canceled, setCanceled] = useState(false);
  let msg = ''
  if (!title.response.data.error) {
    msg = title.response.data.errors[0].msg
  } else {
    msg=title.response.data.error
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanceled(true); // This will hide the alert after 5 seconds
    }, 5000);

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  return (
    <div className={`fixed bottom-5 right-1/4 left-1/4 ${className}`}>
      {!canceled && (
        <div className="bg-[var(--teritory)] rounded-xl div-center-justify px-3">
          <div className="div-center-justify-center gap-3">
            <BiSolidError size={20} className="cursor-pointer" />
            <p className="large-text-normal-weight my-[8px!important] mx-[0px!important]">{msg}</p>
          </div>
          <RxCross2 onClick={() => setCanceled(true)} size={20} className="cursor-pointer" />
        </div>
      )}
    </div>
  );
}
