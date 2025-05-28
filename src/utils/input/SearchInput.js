import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { MdCancel } from 'react-icons/md'

export default function SearchInput({ value, setFormValues, placeHolder, style, className,onChange }) {

    function handleSubmit(e) {
        onChange(e);
    }

    return (
        <form
            onSubmit={handleSubmit}
            // onClick={() => value.length === 0 ? setclicked((prev) => !prev) : null}
            className={`search-container secondary-bg ${className} border-radius-large p-3 div-center`}
            style={{
                ...style
            }}
        >
            <CiSearch />
            <input
                className="primary-text bg-transparent outline-none ml-2 flex-1 "
                style={{
                    border: "none",
                }}
                placeholder={placeHolder ? placeHolder : 'Search...'}
                value={value}
                onChange={(e)=>setFormValues(e.target.value)}

            />
            <MdCancel onClick={()=>setFormValues("")} size={20} className='cursor-pointer' />
        </form>
    )
}
