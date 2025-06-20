import React, { useState } from 'react'
import { ModLookAndFeelTabData } from '../../../../asset/data/modData'
import { useNavigate, useParams } from 'react-router-dom'
import { MdKeyboardArrowRight } from 'react-icons/md';

export default function LookFeel() {
    const [rowInput, setRowInput] = useState(0);

    const navigate = useNavigate();
    const { id } = useParams();

    function handleLookAndFeel(name) {
        if (name === 'tribe_appearence') {
            navigate(`/tribe/${id}/?styling=true`);
        }
    }

    function handleMouseEnter(key) {
        setRowInput(key)
    }

    function handleMouseLeave() {
        setRowInput(null);
    }
    return (
        <div className='!px-7 mod-padding div-col  gap-2'>
            <h1 className='large-title'>Look and Feel</h1>
            {
                ModLookAndFeelTabData.map((item, key) => (
                    <div key={key} onMouseLeave={handleMouseLeave} onMouseEnter={() => handleMouseEnter(key)} onClick={() => handleLookAndFeel(item.id)}>
                        <RowInput item={item} hoverEffect={rowInput === key} />
                    </div>
                ))
            }
        </div>
    )
}

function RowInput({ item, hoverEffect, }) {
    return (
        <div className='div-center-justify p-1 my-2 cursor-pointer'>
            <div>
                <a className='medium-text-normal-weight'>{item.title}</a>
                <p className='small-text-normal-weight text-[var(--text-secondary)]'>{item.desc}</p>
            </div>
            <div className='div-center gap-2'>
                <div className={`p-2 rounded-3xl ${hoverEffect && 'bg-[var(--secondary)]'}`}>
                    <MdKeyboardArrowRight size={20} />
                </div>
            </div>
        </div>
    )
}