import React, { useState } from 'react'
import IconButton from '../../../../utils/buttons/IconButton'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { ModGeneralTabRowInput } from '../../../../asset/data/modData';
import { CommentThreadModal, DescriptionModal, DisplayNameModal, WelcomeMessageModal } from './GeneralModal';

export default function GeneralTab() {
    const [rowInput, setRowInput] = useState(0);
    const [modalHandle, setModalHandle] = useState({
        display_name: false,
        description: false,
        welcome_message: false,
        comment_thread: false,
    });

    function handleSettingModal(name, value) {
        setModalHandle(prev => ({
            ...prev, [name]: value
        }));
    }

    function handleMouseEnter(key) {
        setRowInput(key)
    }
    return (
        <div className='mt-4 w-[70%]'>
            {modalHandle.display_name && <DisplayNameModal name={'display_name'} handleSettingModal={handleSettingModal} />}
            {modalHandle.description && <DescriptionModal name={'description'} handleSettingModal={handleSettingModal} />}
            {modalHandle.welcome_message && <WelcomeMessageModal name={'welcome_message'} handleSettingModal={handleSettingModal} />}
            {modalHandle.comment_thread && <CommentThreadModal name={'comment_thread'} handleSettingModal={handleSettingModal} />}
            {
                ModGeneralTabRowInput.map((item, key) => (
                    <div key={key} onMouseEnter={() => handleMouseEnter(key)} onClick={() => handleSettingModal(item.id, true)}>
                        <RowModalInput title={item.title} desc={item.desc} hoverEffect={rowInput === key} />
                    </div>
                ))
            }
        </div>
    )
}

function RowModalInput({ title, hoverEffect, desc }) {

    return (
        <div className='div-center-justify p-1 my-2 cursor-pointer'>
            <a className='medium-text-normal-weight'>{title}</a>
            <div className='div-center gap-2'>
                <a className='medium-text-normal-weight'>{desc || ""}</a>
                <div className={`p-2 rounded-3xl ${hoverEffect && 'bg-[var(--secondary)]'}`}>
                    <MdKeyboardArrowRight size={20} />
                </div>
            </div>
        </div>
    )
}