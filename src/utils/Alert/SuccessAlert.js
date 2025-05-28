import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";
import { useToastStore } from '../../store/toastStore'

export default function SuccessAlert({ className }) {
    const { toast, hideToast } = useToastStore();

    useEffect(() => {
        if (toast.visible) {
            const timer = setTimeout(() => {
                hideToast(); // This will hide the alert after 5 seconds
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [toast.visible, hideToast]);

    if (!toast.visible) {
        return null;
    }

    return (
        <div className={`fixed z-[1000] bottom-5 right-1/4 left-1/4 `}>
            <div className={`bg-[var(--secondary)] p-4 rounded-[50px] div-center-justify ${className}`}>
                <div className="div-center-justify-center gap-3">
                    {toast.type === 'success' && <toast.icon size={20} className="cursor-pointer" />}
                    {toast.type === 'error' && <RxCross2 size={20} className="cursor-pointer" />}
                    <p className="large-text-normal-weight my-[8px!important] mx-[0px!important]">{toast.message}</p>
                </div>
                <RxCross2 onClick={hideToast} size={20} className="cursor-pointer" />
            </div>
        </div>
    );
}
