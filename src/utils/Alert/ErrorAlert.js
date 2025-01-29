import React, { useState } from 'react'
import { BiSolidError } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

export default function ErrorAlert({ className }) {
    const [canceled, setcanceled] = useState(false)
    return (

        <div className={`main-content ${className}`}>
            {!canceled &&
                <div className='bg-[var(--teritory)] w-[100%] rounded-xl div-center-justify px-3'>
                    <div className='div-center-justify-center gap-3'>
                        <BiSolidError size={20} className='cursor-pointer' />
                        <p className="large-text-normal-weight my-[8px!important] mx-[0px!important]" >Server error. Try again later.</p>
                    </div>
                    <RxCross2 onClick={()=>setcanceled(true)} size={20} className='cursor-pointer' />
                </div>
            }
        </div>
    )
}
