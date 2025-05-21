import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";

export default function SuccessAlert({ className, title, isSuccess }) {
    const [canceled, setCanceled] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            setCanceled(false);
            const timer = setTimeout(() => {
                setCanceled(true); // This will hide the alert after 5 seconds
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isSuccess]);

    if (!isSuccess || canceled) {
        return null;
    }

    return (
        <div className={`fixed z-[1000] bottom-5 right-1/4 left-1/4 ${className}`}>
            {!canceled && (
                <div className="bg-[var(--secondary)] p-4 rounded-[50px] div-center-justify ">
                    <div className="div-center-justify-center gap-3">
                        <FaCheck  ror size={20} className="cursor-pointer" />
                        <p className="large-text-normal-weight my-[8px!important] mx-[0px!important]">{title}</p>
                    </div>
                    <RxCross2 onClick={() => setCanceled(true)} size={20} className="cursor-pointer" />
                </div>
            )}
        </div>
    );
}
